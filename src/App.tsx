import * as React from 'react';
import './App.css';
import { HashRouter as Router, Link } from 'react-router-dom';
import { Router as AppRouter } from './router';
import 'antd/lib/button/style/css'
<<<<<<< HEAD
// import { Button } from 'antd'
=======
import {Button, Menu, Icon} from 'antd'
>>>>>>> dev
import store from "./store/store"

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends React.Component {

  private store$: any;

  private router: Router | null;

  public render() {
    return <Router ref={ref => this.router = ref}>
      <div className="app">
        <Menu mode="horizontal">
          <SubMenu title={<span className="submenu-title-wrapper"><Icon type="bars"/>练习DEMO</span>}>
            <MenuItemGroup title={<span className="menu-group-title">布局</span>}>
              <Menu.Item key="setting:1"><Link to="/demo/girds">栅格布局</Link> </Menu.Item>
              <Menu.Item key="setting:5"><Link to="/games">一个小游戏</Link> </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
<<<<<<< HEAD
          <Menu.Item key="setting:2" ><Link to="/todo">Todo</Link></Menu.Item>
          {/*<Menu.Item key="setting:3" className="cursor-auto float-right" disabled={true} type="primary" ><Button><Link to="/signIn">注册</Link></Button></Menu.Item>*/}
          {/*<Menu.Item key="setting:4" className="cursor-auto float-right" disabled={true}><Button><Link to="/signIn">注册</Link></Button></Menu.Item>*/}
=======
          <Menu.Item key="setting:2"><Link to="/todo">Todo</Link></Menu.Item>
          <Menu.Item key="setting:3" className="cursor-auto float-right" disabled={true} type="primary" ><Button>登录</Button></Menu.Item>
          <Menu.Item key="setting:4" className="cursor-auto float-right" disabled={true}><Button><Link to="/signup">注册</Link></Button></Menu.Item>
>>>>>>> dev
        </Menu>
        <AppRouter/>
      </div>
    </Router>;
  }

  public componentDidMount(): void {
    let id: string | null = '';
    const user = store.getState().user;
    this.store$ = store.subscribe(() => {
      if (user && id !== user._id) {
        id = user._id;
        window.localStorage.setItem('user', JSON.stringify(user))
      }
    })
    // @ts-ignore
    this.router && this.router.history.push('/todo')
  }

  public componentWillUnmount(): void {
    this.store$()
  }
}

export default App;
