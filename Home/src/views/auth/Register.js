import React from "react";
import {
  message,
} from "antd";
import Axios from 'axios';
import {
  Form,
  Input,
  Button,
  Select,
} from 'antd';
import { useHistory } from "react-router-dom";

export default function Register() {

  const { Option } = Select;

  const history = useHistory();

  const onFinish = (values) => {
    if (values.password === values.confpassword) {
      Axios.post('http://localhost:3001/customer/create', values)
        .then((respons) => {
          message.success('Your Registration Success!');
          history.push('/auth/login');
        }).catch((err) => {
          console.log(err);
        })
    }else{
      message.warning('Password is not Match')
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h1 className="text-blueGray-500 text-lg font-bold">
                    Sign up
                  </h1>
                </div>
                <hr className="mt-1 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <Form
                  name="basic"
                  onFinish={(values) => onFinish(values)}
                >
                  <Form.Item rules={[{ required: true, message: 'Please Enter Your Full Name' }]} name="name">
                    <Input placeholder="Your Full Name" />
                  </Form.Item>
                  <Form.Item rules={[{ required: true, message: 'Please Enter Email Address' }]} name="email">
                    <Input placeholder="Your Email Address" />
                  </Form.Item>
                  <Form.Item rules={[{ required: true, message: 'Please Enter Address' }]} name="address">
                    <Input placeholder="Your Address" />
                  </Form.Item>
                  <Form.Item name="gender" rules={[{ required: true, message: 'Please Select Gender' }]}>
                    <Select
                      placeholder="Select a Gender Option "
                      allowClear
                    >
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item rules={[{ required: true, message: 'Please Enter Phone Number' }]} name="phone">
                    <Input placeholder="Your Phone Number" />
                  </Form.Item>
                  <Form.Item rules={[{ required: true, message: 'Please Enter Password' }]} name="password">
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Form.Item rules={[{ required: true, message: 'Please Enter Confirm-Password' }]} name="confpassword">
                    <Input.Password placeholder="Confirm- Password" />
                  </Form.Item>
                  <Form.Item className="text-center">
                    <Button style={{ align: 'center' }} size="large" type="primary" htmlType="submit">
                      Create Account
                    </Button>
                  </Form.Item>
                </Form>
                <div className="text-right">
                  Already have you account? <a style={{ color: 'black' }} href="/auth/login">Login here</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
