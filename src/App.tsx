import * as React from 'react';
import './App.css';
import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
import 'antd/lib/menu/style/css'
import 'antd/lib/icon/style/css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Girds from "./views/Girds";
import Todo from "./views/Todo";


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends React.Component {
  public render() {
    return (
	    <Router>
        <div className="app">
          <Menu mode="horizontal">
            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="bars" />练习DEMO</span>}>
              <MenuItemGroup title={<span className="menu-group-title">布局</span>}>
                <Menu.Item key="setting:1"><Link to="/demo/girds">栅格</Link></Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <Menu.Item key="setting:2"><Link to="/todo">待办事项</Link></Menu.Item>
          </Menu>

          <Route path="/demo/girds" component={Girds} />
          <Route path="/todo" component={Todo} />
        </div>
	    </Router>
    );
    // return (
    //   <Menu mode="horizontal">
    //     <SubMenu title={<span className="submenu-title-wrapper"><Icon type="bars" />练习DEMO</span>}>
    //       <MenuItemGroup title={<span className="menu-group-title">布局</span>}>
    //         <Menu.Item key="setting:1">栅格</Menu.Item>
    //       </MenuItemGroup>
    //     </SubMenu>
    //   </Menu>
    // )
  }
}

export default App;
