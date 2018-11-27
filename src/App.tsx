import * as React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

const Home = () => <div><h1>Home</h1></div>;
const Auth = () => <div><h1>Auth</h1></div>;
const Users = () => <div><h1>Users</h1></div>;

class App extends React.Component{

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

          <Route path="/" exact={true} component={Home} />
          <Route path="/auth" component={Auth} />
          <Route path="/users" component={Users} />
        </div>
      </Router>
    );
  }
}

export default App;
