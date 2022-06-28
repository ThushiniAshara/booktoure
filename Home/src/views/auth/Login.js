import React from "react";
import { Link } from "react-router-dom";
import { message, Form, Input, Button } from 'antd';
import Axios from 'axios';
import { useHistory } from "react-router-dom";

export default function Login() {

  const history = useHistory();

  const onFinish = (values) => {
    console.log('Success:', values);

    Axios.post('http://localhost:3001/customer/login', values
    ).then((respons) => {

      if (respons.data.message) {
        message.error(respons.data.message)
      } else {
        localStorage.setItem('customer', respons.data[0].email)
        history.push('/')
      }
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h1 className="text-blueGray-500 text-sm font-bold">
                    Sign in to Book Tour
                  </h1>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <Form
                  name="basic"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Form.Item>
                    <Button size="large" style={{ width: '100%' }} type="primary" htmlType="submit">
                      LOGIN TO BOOK TOUR
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
