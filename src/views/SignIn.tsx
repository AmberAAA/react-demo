import {Modal, Form, Input, Icon} from "antd";
import * as React from "react";
import 'antd/lib/modal/style/css'
import 'antd/lib/form/style/css'
import 'antd/lib/input/style/css'
import {FormEvent} from "react";
import store from "../store/store";
import {ActionTypes} from "../store/action";

const FormItem = Form.Item;

class SignIn extends React.Component<any, any>{

  constructor (props: any, stats: any) {
    super(props, stats)
    const storeState = store.getState();
    this.state = {
      padding: storeState.padding,
      user: storeState.user,
      errorMsg: storeState.errorMsg
    }
    store.subscribe(() => {this.setState({
      padding: store.getState().padding,
      user: store.getState().user,
      errorMsg: store.getState().errorMsg
    })})
  }

  public submitHandle = (e: FormEvent) => {
    e.preventDefault()


    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // console.log('Received values of form: ', JSON.stringify(values));
        // TODO: 异步提交表单
        store.dispatch({type: ActionTypes.Auth, payload: values})
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
        <Modal title="登录"
               visible={this.props.show}
               confirmLoading={this.state.padding}
               closable={false}
               cancelText="关闭"
               mask={true}
               okText="登录"
               width={420}
               onCancel={e => null}
               okButtonProps={{"htmlType": "submit"}}
               getContainer={() => (document.querySelector('.sign-form') as HTMLElement)}
        >
          {this.state.padding ? '1' : '0'}
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
}

export default Form.create()(SignIn)
