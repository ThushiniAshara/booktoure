import {
  Avatar, Card, Col, Form, Input, message, Modal, Popconfirm, Radio, Row, Select
} from "antd";
import { Option } from "antd/lib/mentions";
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import BgProfile from "../assets/images/bg-profile.jpg";

function Profile() {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const history = useHistory();
  const [author, setAuthor] = useState([]);
  const [books, setBooks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalEmailVisible, setIsModalEmailVisible] = useState(false);
  const [isModalPasswordVisible, setIsModalPasswordVisible] = useState(false);

  useEffect(() => {

    if (localStorage.getItem('author') !== 'admin') {
      getAurthor();
    } else {
      history.push('/sign-in');
    }

  }, [])

  const getAurthor = () => {
    Axios.get(`http://localhost:3001/author/getauthorid/${localStorage.getItem('author')}`).then((respons) => {
      setAuthor(respons.data[0]);
    })
  }

  const loadBooksByID = () => {
    Axios.get(`http://localhost:3001/book/viewbyid/${author.author_id}`).then((respons) => {
      setBooks(respons.data);
      console.log(respons.data);
    })
  }

  const confirm = () => {

    books.map((val, i) => {
      Axios.delete(`http://localhost:3001/cart/deletebyBookID/${val.book_id}`);
      Axios.delete(`http://localhost:3001/download/deletebyBookID/${val.book_id}`);
      Axios.delete(`http://localhost:3001/book/delete/${val.book_id}`);
    })

    Axios.delete(`http://localhost:3001/author/delete/own/${author.author_id}`).then(() => {
      message.success('Your Account Delete Success!');
      localStorage.clear();
      window.location.href = '/sign-in';
    })

  }

  const cancel = () => {

  }

  const showModal = () => {
    setIsModalVisible(true);
  };
  const showChangeEmailModal = () => {
    setIsModalEmailVisible(true);
  };
  const showChangePasswordModal = () => {
    setIsModalPasswordVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalEmailVisible(false);
    setIsModalPasswordVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {

    Axios.put(`http://localhost:3001/author/edit/details/${localStorage.getItem('author')}`, values)
      .then(() => {
        handleCancel();
        getAurthor();
        message.success('You Profile Edit is Success!');
        form.resetFields();
      }).catch((err) => {
        console.log(err);
      })
  }

  const onFinishEmailChange = (values) => {

    Axios.put(`http://localhost:3001/author/edit/email/${localStorage.getItem('author')}`, values)
      .then(() => {
        handleCancel();
        message.success('You Profile Edit is Success!');
        localStorage.clear();
        window.location.href = '/sign-in';
      }).catch((err) => {
        console.log(err);
      })
  }

  const onFinishPasswordChange = (values) => {

    Axios.get(`http://localhost:3001/author/edit/detailsvalidate/${localStorage.getItem('author')}`).then((respons) => {

      if (respons.data[0].password !== values.c_password) {
        message.warning("Password is Not Match");
      } else {

        Axios.put(`http://localhost:3001/author/edit/password/${localStorage.getItem('author')}`, values)
          .then(() => {
            handleCancel();
            message.success('You Profile Edit is Success!');
            localStorage.clear();
            window.location.href = '/sign-in';
          }).catch((err) => {
            console.log(err);
          })
      }
    })
  }

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{author.name}</h4>
                  <p>{author.description}</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Radio.Group defaultValue="a">
                <Radio.Button onClick={() => { showModal() }} value="a">Edit Details</Radio.Button>
                <Radio.Button onClick={() => { showChangeEmailModal() }} value="b">Change Email</Radio.Button>
                <Radio.Button onClick={() => { showChangePasswordModal() }} value="c">Change Password</Radio.Button>
                <Popconfirm
                  title="Do you want to Delete Account?"
                  onConfirm={(confirm)}
                  onCancel={cancel}
                  okText="Delete Book"
                  cancelText="No"
                >

                  <Radio.Button onClick={() => { loadBooksByID() }} value="c">Delete Account</Radio.Button>
                </Popconfirm>
              </Radio.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={24} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Your Details</h6>}
          >
            <ul className="list settings-list">
              <li>
                <span>Name : </span>
                <span>{author.name}</span>
              </li>
              <li>
                <span>Address : </span>
                <span>{author.address}</span>
              </li>
              <li>
                <span>Email : </span>
                <span>{author.email}</span>
              </li>
              <li>
                <span>Phone Number : </span>
                <span>{author.phone}</span>
              </li>
              <li>
                <span>Gender : </span>
                <span>{author.gender}</span>
              </li>
              <li>
                <span>Registerd Date : </span>
                <span>{author.cdate}</span>
              </li>
              <li>
                <span>Facebook : </span>
                <span><a href={author.facebook}>{author.facebook}</a></span>
              </li>
              <li>
                <span>Twitter : </span>
                <span><a href={author.twitter}>{author.twitter}</a></span>
              </li>
              <li>
                <span>Description : </span>
                <span>{author.description}</span>
              </li>
            </ul>
          </Card>
        </Col>
      </Row>


      <Modal title="Edit Profile" okText="Submit" onOk={form.submit} visible={isModalVisible} onCancel={handleCancel}>
        <Form
          name="basic"
          onFinish={(values) => onFinish(values)}
          form={form}
        >
          <Form.Item name="name">
            <Input placeholder="Your Full Name" />
          </Form.Item>
          <Form.Item name="address">
            <Input placeholder="Your Address" />
          </Form.Item>
          <Form.Item name="description">
            <Input placeholder="Your Description" />
          </Form.Item>
          <Form.Item name="facebook">
            <Input placeholder="Facebook" />
          </Form.Item>
          <Form.Item name="twitter">
            <Input placeholder="Twitter" />
          </Form.Item>
          <Form.Item name="gender">
            <Select
              placeholder="Select a Gender Option "
              allowClear
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item name="phone">
            <Input placeholder="Your Phone Number" />
          </Form.Item>
        </Form>
      </Modal>


      <Modal title="Change Email" okText="Submit" onOk={form.submit} visible={isModalEmailVisible} onCancel={handleCancel}>
        <Form
          name="basic"
          onFinish={(values) => onFinishEmailChange(values)}
          form={form}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Your New Email Address" />
          </Form.Item>

          <Form.Item
            name="confirm_email"
            placeholder="Confirm Email"
            dependencies={['email']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('email') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two Emails that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input placeholder="Your Confirm Email Address" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Change Password" okText="Submit" onOk={form1.submit} visible={isModalPasswordVisible} onCancel={handleCancel}>
        <Form
          name="basicChangePassword"
          onFinish={(values) => onFinishPasswordChange(values)}
          form={form1}
        >
          <Form.Item
            name="c_password"
            hasFeedback
          >
            <Input.Password placeholder="Your Current Password" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Your New Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            placeholder="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Your Confirm New Password" />
          </Form.Item>
        </Form>
      </Modal>

    </>
  );
}

export default Profile;
