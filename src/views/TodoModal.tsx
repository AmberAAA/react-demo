import * as React from "react";
import {TODO} from "../module";
import "./TodoModal.css"
import {Button, Input, Modal, Checkbox} from 'antd';


interface Props {
  todo: TODO,
  onSave: (e: TODO) => void
  onCancle: () => void
  onDelete: (e: TODO) => void,
  visible: boolean
}


interface State {
  input: string
}

class TodoModal extends React.Component<Props, State> {

  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {
      input: ""
    }
  }

  public componentWillReceiveProps = (nextProps: Readonly<Props>, nextContext: any): void => {
    this.setState({
      input: ""
    });
    if (nextProps.visible) {
      setTimeout(() => {
        (document.querySelector(".modal-input") as HTMLInputElement).focus();
      }, 50)
    }
  };

  public render(): React.ReactNode {
    return (
      <Modal title={"编辑事项"}
             visible={this.props.visible}
             closable={false}
             mask={true}
             footer={null}
             getContainer={() => document.getElementById("todo") as HTMLElement}
      >
        <p className={"gray-7 edit-subtitle"}>我在 {new Date(this.props.todo.addTime).toLocaleString()} 创建了</p>
        <p className={"bold gray-9"}>{this.props.todo.title}</p>
        <ul className={["todo-ul", this.props.todo.list.length && "border"].join(" ")}>
          {this.props.todo.list.map((item, index) =>
            <li key={index}>
              <Checkbox defaultChecked={item.finish}
                        onChange={e => item.finish = e.target.checked}/>
              <span className={item.finish ? "under-line" : ""}>{item.name}</span>
              <Button htmlType={"button"} size={"small"} type={"danger"} onClick={() => {
                this.deleteItem(index)
              }}>删除</Button>
          </li>)}
        </ul>
        <Input size={"small"}
               autoFocus={true}
               className={"modal-input"}
               value={this.state.input}
               onChange={e => this.setState({input: e.target.value})}
               onKeyDown={e => this.addTODODetails(e, this.props.todo, this.state.input)}
               placeholder={"回车保存步骤"}
        />
        {/*<p className={"gray-6"}>设置分类</p>*/}
        <div className="todo-modal-footer">
          <Button htmlType={"button"} type={"danger"} onClick={() => this.sendEmmit(this.props.onDelete)}>删除</Button>
          <Button htmlType={"button"} type={"primary"} onClick={() => this.sendEmmit(this.props.onSave)}>确定</Button>
          <Button htmlType={"button"} onClick={() => this.sendEmmit(this.props.onCancle)}>取消</Button>
        </div>
      </Modal>
    )
  }

  private sendEmmit(callBack: (t: TODO) => void) {
    callBack(this.props.todo)
  }

  private addTODODetails = (e: React.KeyboardEvent<HTMLInputElement>, todo: TODO, value: string) => {
    if (e.key.toLowerCase() === "enter" && value) {
      todo.list.push({name: value, finish: false});
      this.forceUpdate();
      this.setState({input: ""})
    }
  }

  private deleteItem(index: number) {
    this.props.todo.list.splice(index, 1);
    this.forceUpdate();
  }
}


export default TodoModal
