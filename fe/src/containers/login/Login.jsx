import React from 'react';
import axios from 'axios'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.scss';
export default class Login extends React.Component {
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
    console.log('Received values of form: ', values);
    // let formdata = new FormData();
        // formdata.append('username',values.username)
      //  formdata.append('password',values.password)
    axios
        .post('/userinfos',{
          username: values.username,
          password:values.password
        })
        .then(res => {
          console.log('收到啦！！！');
          console.log(res);
          if(res.data.length === 1) {
            console.log(this);
            this.props.login()
            this.props.history.push('/')
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
            // help = 'The default password is the last six digits of the student number'
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
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
