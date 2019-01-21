import * as React from 'react';
import './App.css';
import { HashRouter as Router, Link } from 'react-router-dom';
import { Router as AppRouter } from './router';
import { Button, Menu, Icon } from 'antd'
import store from "./store/store"
import {ActionTypes} from "./store/action"

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

interface State {
    uid: null | string
}

class App extends React.Component<{}, State> {

  public constructor(props: Router, states: State) {
    super(props)
    this.state = {
      uid: null
    }
  }

  private store$: any;

  private router: Router | null;

  public render() {
    return <Router ref={ref => this.router = ref}>
      <div className="app">
        <Menu mode="horizontal">
          <SubMenu title={<span className="submenu-title-wrapper"><Icon type="bars" />练习DEMO</span>}>
            <MenuItemGroup title={<span className="menu-group-title">布局</span>}>
              <Menu.Item key="setting:1"><Link to="/demo/girds">栅格布局</Link> </Menu.Item>
              <Menu.Item key="setting:5"><Link to="/games">一个小游戏</Link> </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <Menu.Item key="setting:2"><Link to="/todo">Todo</Link></Menu.Item>
          { !this.state.uid && <Menu.Item key="setting:3" className="cursor-auto float-right" disabled={true} type="primary" ><Button>登录</Button></Menu.Item>}
          { !this.state.uid && <Menu.Item key="setting:4" className="cursor-auto float-right" disabled={true}><Button><Link to="/signup">注册</Link></Button></Menu.Item>}
          { !!this.state.uid && <Menu.Item key="setting:5" className="cursor-auto float-right" disabled={true}><Button onClick={this.signOut}>登出</Button></Menu.Item>}
          
        </Menu>
        <AppRouter />
      </div>
    </Router>;
  }

  public componentDidMount(): void {

    this.store$ = store.subscribe(() => {
      const user = store.getState().user;
      this.setState({uid: user && user._id ? user._id : null})
      if (user && user._id && this.state.uid !== user.id) {
        window.localStorage.setItem('user', JSON.stringify(user))
      }
    })

    /* 
      为了不让报错，我也不知道为什么。
      TODO: 下次有空再看。
    */
    // @ts-ignore
    if (this.router && this.router.history.location.pathname !== '/signIn') {
      // @ts-ignore
      this.router.history.push('/todo')
    }
  }

  public componentWillUnmount(): void {
    this.store$()
  }

  public signOut ():void {
    store.dispatch({type: ActionTypes.CLEAERCACHE, payload: null});
  }
}

export default App;
