import {Input, Modal} from "antd";
import * as React from "react";
import {TODO} from "../module";
import {Checkbox} from 'antd';
import "antd/lib/checkbox/style/css";


interface Props {
  todo: TODO,
  onSave: (e: TODO) => void
  onCancle: () => void
  onDelete: (e: TODO) => void,
  visible: boolean
}


interface State {
  hiddenEditInput: boolean,
  input: string
}

class TodoModal extends React.Component<Props, State> {

  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {
      hiddenEditInput: false,
      input: ""
    }
  }

  public componentWillReceiveProps = (nextProps: Readonly<Props>, nextContext: any): void => {
    this.setState({
      input: ""
    });
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
        <ul>
          {this.props.todo.list.map((item, index) => <li key={index}><Checkbox defaultChecked={item.finish}
                                                                               onChange={e => item.finish = e.target.checked}/> {item.name}
          </li>)}
        </ul>
        {!this.state.hiddenEditInput &&
				<Input size={"small"}
				       autoFocus={true}
				       className={"modal-input"}
				       value={this.state.input}
				       onChange={e => {
                 this.setState({input: e.target.value})
               }}
				       onKeyDown={e => this.addTODODetails(e, this.props.todo, this.state.input)}
				/>}
        <p className={"gray-7 edit-placeholder"} onClick={() => this.setState({hiddenEditInput: false})}>点击添加步骤</p>
        <p className={"gray-6"}>设置分类</p>
        <button onClick={() => this.sendEmmit(this.props.onDelete)}>删除</button>
        <button onClick={() => this.sendEmmit(this.props.onSave)}>确定</button>
        <button onClick={() => this.sendEmmit(this.props.onCancle)}>取消</button>
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

}


export default TodoModal
