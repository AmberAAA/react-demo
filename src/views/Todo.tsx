import * as React from 'react';
import {Redirect, RouteProps} from 'react-router'
import './Todo.css'
import store from '../store/store';
import { Row, Col, Input } from "antd";
import {InterUser, TODO, url} from "../module";
import {ChangeEvent} from "react";
import axios from "axios";
import {ActionTypes} from "../store/action";

interface State {
  user: InterUser,
  padding: boolean,
  todos: TODO[],
  input: string
}

class Todo extends React.Component<RouteProps, State> {

  private store$: any;

  constructor(props: any, state: State) {
    super(props, state)
    const storeState = store.getState();
    this.state = {
      user: storeState.user,
      padding: storeState.padding,
      todos: [],
      input: ''
    };
    store.subscribe(() => {
      const state1 = store.getState()
      this.setState({
        user: state1.user,
        padding: state1.padding,
        todos: state1.todoList
      })
    })
  }

  public componentWillMount = () => {
    this.store$ = store.subscribe(() => {
      const state1 = store.getState()
      this.setState({
        user: state1.user,
        padding: state1.padding,
      })
    })
    this.getTODOList();
  }

  public componentWillUnmount = () => {
    this.store$();
  }

  public getTODOList = () => {
    if (this.state.user && this.state.user._id) {
      axios.get(url.todo, { params:{ id:  this.state.user._id} } )
        .then(data => {
          if (data.data.state === 0) {
            // TODO: dispatch todo list
            store.dispatch({ type: ActionTypes.SETTODOLIST, payload: data.data.data })
          }
        })
    }
  }

  public addTODOList = (payload: any) => {
    store.dispatch( {type: ActionTypes.PADDING, payload: true})
    axios.post(url.todo, payload)
      .then(data => {
        if (data.data.state === 0) {
          store.dispatch({ type: ActionTypes.ADDTODOLIST, payload: data.data.data })
          this.setState({input: ""})
        }
        store.dispatch( {type: ActionTypes.PADDING, payload: false})
      })
  }


  public TodoItem = (props: {todo: TODO}) => {
    return (
      <li className="todo-item"
          // onClick={e => this.deleteTodoHandle(props.todo, e)}
      >
        <i className="todo-block" />
        <span className="todo-button unfinish"><i/></span>
        <p className="todo-title">{props.todo.title}</p>
        <span className="todo-start"><i /></span>
      </li>
    )
  }

  public TodoList = (todos: TODO[]) => todos.map(todo => <this.TodoItem todo={todo} key={todo._id}/>)

  public deleteTodoHandle = (todo: TODO, e:any) => {
    e.preventDefault()
    if (this.state.padding) { return; }
    store.dispatch({type:ActionTypes.PADDING, payload: true});
    axios.delete(url.todo, {
      params: {_id: todo._id}
    })
      .then(data => {
        store.dispatch({type:ActionTypes.PADDING, payload: false});
        store.dispatch({type:ActionTypes.DELETETODOLIST, payload: todo})
      })
  }


  public render(): React.ReactNode {
    if (!(this.state.user && this.state.user._id)) {
      return (
        <Redirect to={{pathname: "/signIn", state: {from: this.props.location }}} />
      )
    }

    return (
      <div id="todo">
        <div className="main">
          <Row type="flex" justify="center">
            <Col span={20}>
              <Input size={"large"}
                     placeholder={"回车保存"}
                     value={this.state.input}
                     onChange={this.inputChangHandle}
                     onKeyDown={this.enterHandle}
                     disabled={this.state.padding}
              />
            </Col>
            <Col span={20}>
              {this.TodoList(this.state.todos)}
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


  public inputChangHandle  = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({input: e.target.value})
  }


  public enterHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      this.addTODOList({
        owner: this.state.user._id,
        title: this.state.input,
        list: []
      })
    }
  }
}

export default Todo
