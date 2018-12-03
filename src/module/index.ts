export interface InterUser {
  email: string,
  passwd: string,
  _id ?: string
}


const HOST = ``;
// const HOST = `http://127.0.0.1:8080`;

export const url = {
  auth: `${HOST}/api/login`,
  todo: `${HOST}/api/todo`
};

export interface TODO {
  _id: string,
  owner: string,
  title: string,
  list: []
}
