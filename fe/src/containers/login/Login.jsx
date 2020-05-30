import React from 'react';
import axios from 'axios'
import { Form, Input, Button, Checkbox } from 'antd';
import {connect} from 'react-redux';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {login as actionLogin} from '../../store/action'

import './login.scss';
class Login extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      loginInfo: {
        username: '',
        password: '',
      },
    };
  }
  onFinish = (values) => {
    axios
        .post('/userinfos',{
          username: values.username,
          password:values.password
        })
        .then(res => {
          if(res.data.errcode === 0) {
            const contents = res.data.types.split(',')
            
            this.props.login(contents,values.username)
            this.props.history.push('/')
          }else if(res.data.errcode === 1) {
            alert('密码或者账户错误')
          }else{
            alert('登录失败！')
          }
        })
        .catch(err => {
          console.log(err);
        })
  };
  onFinishFailed = (val, err, outDate) => {
    console.log(err);
  };
  render() {
    return (
      <div id="login">
        <div id="login-title">WELCOME TO MY BLOG</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                pattern: /^201\d[0-9]{9,9}$/,
                message: 'Please input your Student Number!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              autoComplete="on"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/forgetPasswd">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              LOG IN
            </Button>
            Or <a href="/sign">register? now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
    login: (cont, name) => dispatch(actionLogin(cont, name))
})
export default connect(null, mapDispatchToProps)(Login);