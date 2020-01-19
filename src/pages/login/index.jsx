import React from 'react';
import styles from './index.module.scss'
import Logo from 'src/static/logo.svg'
import { Form, Icon, Input, Button } from 'antd';
import BgPic from 'src/static/bg.jpg'
import { authToken } from 'src/utils/util'

class Login extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        // TODO：登录接口请求，返回结果

        // 登录成功后，在本地存authToken
        authToken.set("666")

        // redirectTo 登录后跳转到的页面，没有则进入首页
        const locState = this.props.history.location.state
        let pathName = '/'
        if (locState && locState.redirectTo) {
          pathName = locState.redirectTo
        }
        this.props.history.push({
          pathname: pathName
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.login} style={{ backgroundImage: `url(${BgPic})` }}>
        <div className={styles.main}>
          <div className={styles.header}>
            <img src={Logo} className={styles.logo} alt="logo" />
            <span className={styles.name}>后台管理</span>
          </div>
          <Form onSubmit={this.handleSubmit} className={styles.form}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.submit}>
                登录
            </Button>
            </Form.Item>
            <div className={styles.helper}>
              <div className={styles.left}>没有账号？ <Button type="link">注册</Button></div>
              <div className={styles.right}><Button type="link">忘记密码</Button></div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const LoginForm = Form.create({ name: 'login_form' })(Login);

export default LoginForm
