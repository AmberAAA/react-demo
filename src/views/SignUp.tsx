import * as React from "react";
import {FormEvent} from "react";
import store from "../store/store";
import {ActionTypes} from "../store/action";
import axios from "axios";
import { url } from "../module"
import {Modal, Form, Input, Icon, message} from "antd";

const FormItem = Form.Item;

class SignIn extends React.Component<any, any>{


  private store$: any;

  constructor (props: any, stats: any) {
    super(props, stats)
    const storeState = store.getState();
    this.state = {
      padding: storeState.padding,
      user: storeState.user,
      errorMsg: storeState.errorMsg,
      show: true
    }

  }

  public componentWillMount = () => {
    this.store$ = store.subscribe(() => {this.setState({
      padding: store.getState().padding,
      user: store.getState().user,
      errorMsg: store.getState().errorMsg
    })})
  }

  public componentWillUnmount = () => {
    this.store$()
  }

  public submitHandle = (e: FormEvent) => {
    e.preventDefault()


    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // console.log('Received values of form: ', JSON.stringify(values));
        // TODO: 异步提交表单
        // store.dispatch({type: ActionTypes.Auth, payload: values})
        this.ajaxAuth(values);
      }
    })
  }

  // @ts-ignore
  // TODO: 表单的异步验证
  // public errorHandle = (rule, value, callback) => {
  //   this.state.errorMsg ? callback(new Error(this.state.errorMsg)) : callback()
  // }

  public render(): React.ReactNode {

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }

    return (
      <Form action="#" onSubmit={this.submitHandle} className="sign-form">
        <Modal title="注册"
               visible={this.state.show}
               confirmLoading={this.state.padding}
               closable={false}
               cancelText="取消"
               mask={true}
               okText="注册"
               width={420}
               onCancel={e => this.props.history.go(-1)}
               okButtonProps={{"htmlType": "submit"}}
               getContainer={() => (document.querySelector('.sign-form') as HTMLElement)}
        >
          <FormItem label="邮箱" {...formItemLayout}>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: '请输入正确的邮箱',
              }, {
                required: true, message: '请输入邮箱',
              }],
            })(
              <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}  />} />
            )}
          </FormItem>
          <FormItem label="密码" {...formItemLayout}>
            {getFieldDecorator('passwd', {
              rules: [{
                required: true, message: '请输入密码',
              }],
            })(<Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="密码" type="password"/>)}
          </FormItem>
        </Modal>
      </Form>
    )
  }

  private ajaxAuth = (values: any) => {
    store.dispatch({type: ActionTypes.PADDING, payload: true});
    axios.post(url.auth, values)
      .then(data => {
        store.dispatch({type: ActionTypes.PADDING, payload: false});
        if (data.data.state === 0) {
          store.dispatch({type: ActionTypes.AuthSuccess, payload: data.data.data})
          this.setState({show: false})
          setTimeout(() => {
            const state = this.props.location.state
            if (state) {
              this.props.history.push(state.from)
            } else {
              this.props.history.push('/')
            }
          }, 300)
        } else {
          store.dispatch({type: ActionTypes.AuthFile, payload: data.data.message})
        message.error(data.data.message)
        }
      })
  }

}

export default Form.create()(SignIn)
