import * as React from 'react';
import {Redirect, RouteProps} from 'react-router'
import './Todo.css'
import store from '../store/store';
import {Row, Col} from "antd";
import {InterUser, TODO, url} from "../module";
import {ChangeEvent, FormEvent} from "react";
import axios from "axios";
import {ActionTypes} from "../store/action";
import {sort} from "../module";
import QueueAnim from "rc-queue-anim";

interface State {
  user: InterUser,
  padding: boolean,
  todos: TODO[],
  input: string
}

class Todo extends React.Component<RouteProps, State> {

  private store$: any;

  constructor(props: any, state: State) {
    super(props, state);
    const storeState = store.getState();
    this.state = {
      user: storeState.user,
      padding: storeState.padding,
      todos: [],
      input: '',
    };
  }

  public componentWillMount = () => {
    this.store$ = store.subscribe(() => {
      const state1 = store.getState();
      this.setState({
        user: state1.user,
        padding: state1.padding,
        todos: sort(state1.todoList),
      })
    });
    this.getTODOList();
    this.setInputFocus();
  };

  public componentWillUnmount = () => {
    this.store$();
  };

  public inputChangHandle = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({input: e.target.value})
  };


  public enterHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      this.addTODOList({
        owner: this.state.user._id,
        title: this.state.input,
        list: []
      })
    }
  };


  public render(): React.ReactNode {
    if (!(this.state.user && this.state.user._id)) {
      return (
        <Redirect to={{pathname: "/signIn", state: {from: this.props.location}}}/>
      )
    }

    return (
      <div id="todo">
        <div className="main">
          <Row type="flex" justify="center">
            <Col span={20} className={"flex"}>
              <input width={"100%"}
                     placeholder={"新建事件 回车保存"}
                     value={this.state.input}
                     onChange={this.inputChangHandle}
                     onKeyDown={this.enterHandle}
                     disabled={this.state.padding}
                     autoFocus={true}
                     className={"main-input"}
              />
            </Col>
            <Col span={20}>
              <QueueAnim type={["right", "left"]}
                         ease={['easeOutQuart', 'easeInOutQuart']}
                         component={"ul"}
              >
                {this.TodoList(this.state.todos)}
              </QueueAnim>
            </Col>
          </Row>
        </div>
        <div className="right">
          <nav>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }


  private getTODOList = () => {
    if (this.state.user && this.state.user._id) {
      axios.get(url.todo, {params: {id: this.state.user._id}})
        .then(data => {
          if (data.data.state === 0) {
            store.dispatch({type: ActionTypes.SETTODOLIST, payload: data.data.data})
          }
        })
    }
  };

  private addTODOList = (payload: any) => {
    store.dispatch({type: ActionTypes.PADDING, payload: true});
    axios.post(url.todo, payload)
      .then(data => {
        if (data.data.state === 0) {
          store.dispatch({type: ActionTypes.ADDTODOLIST, payload: data.data.data});
          this.setState({input: ""});
        }
        store.dispatch({type: ActionTypes.PADDING, payload: false});
        setTimeout(() => this.setInputFocus(), 50)
      })
  };

  private TodoItem = (props: { todo: TODO }) => {
    return (
      <li className={`todo-item ${props.todo.finish && "todo-item-finish"}`}>
        <i className="todo-block"/>
        <span className="todo-button" onClick={e => this.changeFinish(props.todo, e)}><i/></span>
        <p className="todo-title">{props.todo.title}</p>
        <span className={`todo-start ${props.todo.star ? "mark" : ""}`}
              onClick={e => this.changeStart(props.todo, e)}><i/></span>
      </li>
    )
  };

  private TodoList = (todos: TODO[]) => todos.map(todo => <this.TodoItem todo={todo} key={todo._id}/>);

  private changeStart = (todo: TODO, e: FormEvent) => {
    e.preventDefault();
    todo.star = !todo.star;
    this.changeTODO(todo);
  };

  private changeFinish = (todo: TODO, e: FormEvent) => {
    e.preventDefault();
    todo.finish = !todo.finish;
    this.changeTODO(todo);
  };

  private changeTODO = (todo: TODO) => {
    // store.dispatch({type:ActionTypes.MODIFYTODOLIST, payload: todo});
    const id = todo._id;
    delete todo._id;
    store.dispatch({type: ActionTypes.DELETETODOLIST, payload: todo})
    setTimeout(() => {
      store.dispatch({type: ActionTypes.ADDTODOLIST, payload: todo})
    }, 400)
    axios.put(`${url.todo}?id=${id}`, todo)
      .then((data: any) => {
        if (data.data.state === 0) {
          // store.dispatch({type:ActionTypes.MODIFYTODOLIST, payload: data.data.data});
        } else {
          // TODO: 出错了！
          alert("出错了！")
        }
      })
      .catch(() => {
        // TODO: 出错了！
        alert("出错了！")
      })
  };

  // private deleteTodoHandle = (todo: TODO, e: any) => {
  //   e.preventDefault();
  //   if (this.state.padding) {
  //     return;
  //   }
  //   store.dispatch({type: ActionTypes.PADDING, payload: true});
  //   axios.delete(url.todo, {
  //     params: {_id: todo._id}
  //   })
  //     .then(() => {
  //       store.dispatch({type: ActionTypes.PADDING, payload: false});
  //       store.dispatch({type: ActionTypes.DELETETODOLIST, payload: todo});
  //     })
  // };

  private setInputFocus = () => {
    const inputDom = document.querySelector("#todo .main input") as HTMLInputElement;
    if (inputDom) {
      inputDom.focus()
    }
  }
}

export default Todo
