import * as React from 'react';
import './Todo.css'

class Todo extends React.Component<{}, {}>{
  public render(): React.ReactNode {
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
