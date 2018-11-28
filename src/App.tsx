import * as React from 'react';
import './App.css';
import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
import 'antd/lib/menu/style/css'
import 'antd/lib/icon/style/css'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Router as AppRouter } from './router';
import 'antd/lib/button/style/css'
import  SignIn from './views/SignIn'
import { Button } from 'antd'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends React.Component {
  public render() {
    return <Router>
      <div className="app">
        <Menu mode="horizontal">
          <SubMenu title={<span className="submenu-title-wrapper"><Icon type="bars"/>练习DEMO</span>}>
            <MenuItemGroup title={<span className="menu-group-title">布局</span>}>
              <Menu.Item key="setting:1"><Link to="/demo/girds">栅格布局</Link> </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <Menu.Item key="setting:2" ><Link to="/todo">Todo</Link></Menu.Item>
          <Menu.Item key="setting:3" className="cursor-auto float-right" disabled={true} type="primary" ><Button>登录</Button></Menu.Item>
          <Menu.Item key="setting:4" className="cursor-auto float-right" disabled={true}><Button><Link to="/signup">注册</Link></Button></Menu.Item>
        </Menu>
        <SignIn show={true}/>
        <AppRouter/>
      </div>
    </Router>;
  }
}

export default App;
