import * as React from 'react';
import {Redirect} from 'react-router'
import './Todo.css'
import store from '../store/store';

class Todo extends React.Component<{}, {}> {

  constructor(props: any, state: any) {
    super(props, state)
    const storeState = store.getState();
    this.state = {
      user: storeState.user
    };

  }

  public render(): React.ReactNode {
    // @ts-ignore
    if (!(this.state.user && this.state.user._id)) {
      return (
        // @ts-ignore
        <Redirect to={{pathname: "/signIn", state: {from: this.props.location }}} />
      )
    }

    return (
      <div id="todo">
        <div className="main">
          <div className="todo-enter">
            1
          </div>
          <div className="todo-list">
            1
          </div>
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
}

export default Todo
