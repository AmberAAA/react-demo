import * as React from 'react';
import './App.css';
import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
import 'antd/lib/menu/style/css'
import 'antd/lib/icon/style/css'
import { HashRouter as Router, Link } from 'react-router-dom';
import { Router as AppRouter } from './router';
import 'antd/lib/button/style/css'
import { Button } from 'antd'
import store from "./store/store"

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends React.Component {

  private store$: any;

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
        <AppRouter/>
      </div>
    </Router>;
  }

  public componentDidMount(): void {
    let id: string | null = '';
    this.store$ = store.subscribe(() => {
      const user = store.getState().user
      if (user && id !== user._id) {
        id = user._id;
        window.localStorage.setItem('user', JSON.stringify(user))
      }
    })
  }

  public componentWillUnmount(): void {
    this.store$()
  }
}

export default App;
