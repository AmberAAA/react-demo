import * as React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import store, {ActionTypes} from './store/store';

const Home = () => <div><h1>Home</h1></div>;
const Auth = () => <div><h1>Auth</h1></div>;
const Users = () => <div><h1>Users</h1></div>;

interface InterAppState {
  count: number
}

class App extends React.Component<{}, InterAppState>{

  // @ts-ignore
  constructor () {
    // @ts-ignore
    this.state = {count: 0};
    store.subscribe(() => this.setState({count: store.getState().count}))
    setInterval(() => store.dispatch({type: ActionTypes.increment}), 1000)
  }

  public render(): React.ReactNode {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/" >Home</Link></li>
              <li><Link to="/auth" >Auth</Link></li>
              <li><Link to="/users" >Users</Link></li>
            </ul>
          </nav>

          {this.state.count}

          <Route path="/" exact={true} component={Home} />
          <Route path="/auth" component={Auth} />
          <Route path="/users" component={Users} />
        </div>
      </Router>
    );
  }
}

export default App;
