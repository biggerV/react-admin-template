import React from 'react';
import styles from './index.module.scss'
import { Form, Icon, Input, Button } from 'antd';

class Login extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        sessionStorage.setItem("authToken", "123456")
        this.props.history.push({
          pathname: '/dashboard'
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.login}>
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
    );
  }
}

const LoginForm = Form.create({ name: 'login_form' })(Login);

export default LoginForm
