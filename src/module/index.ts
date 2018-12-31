export interface InterUser {
  email: string,
  passwd: string,
  _id ?: string
}


const HOST = ``;
// const HOST = `http://anborong.top`;
// const HOST = `http://39.98.92.253:10000`;

export const url = {
  auth: `${HOST}/api/login`,
  todo: `${HOST}/api/todo`
};

export interface TODO {
  _id: string,
  owner: string,
  title: string,
  list: TODODetails[],
  star?: boolean,
  finish?: boolean,
  addTime: any,
  modifiedTime: any
}

export interface TODODetails {
  name: string,
  finish: boolean
}

// 排序条件
// 1. 加星的必须排到前面， 再按照modify时间倒叙排列
// 2. 不加星的排到中间， 再按照modify时间倒叙排列
// 3. 完成的排到最后，并按照modify时间倒叙排练
export function sort(todos: TODO[]): TODO[] {
  const finish: TODO[] = [];
  const nomal: TODO[] = [];
  const star: TODO[] = [];
  todos.map(item => {
    if (item.star) {
      star.push(item);
      return item
    }
    if (!item.star && !item.finish) {
      nomal.push(item);
      return item
    }
    finish.push(item);
    return item
  });

  finish.sort((a: TODO, b: TODO) => new Date(b.modifiedTime).valueOf() - new Date(a.modifiedTime).valueOf());
  nomal.sort((a: TODO, b: TODO) => new Date(b.modifiedTime).valueOf() - new Date(a.modifiedTime).valueOf());
  star.sort((a: TODO, b: TODO) => new Date(b.modifiedTime).valueOf() - new Date(a.modifiedTime).valueOf());

  return star.concat(nomal).concat(finish);
}
