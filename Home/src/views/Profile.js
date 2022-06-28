import { faDeleteLeft, faEdit, faFileEdit, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, message, Modal, Popconfirm, Select } from "antd";
import { Option } from "antd/lib/mentions";
import Axios from 'axios';
import Footer from "components/Footers/Footer.js";
import Navbar from "components/Navbars/IndexNavbar";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


export default function Profile() {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [header, setHeader] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalEmailVisible, setIsModalEmailVisible] = useState(false);
  const [isModalPasswordVisible, setIsModalPasswordVisible] = useState(false);
  const history = useHistory();
  const [customer, getCustomer] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('customer')) {
      history.push('/auth/login');
    }
    getHeader();
    loadCustomer();
  }, [])

  const confirm = () => {
    Axios.delete(`http://localhost:3001/customer/delete/own/${localStorage.getItem('customer')}`).then(() => {
      message.success('Your Account Delete Success!');
      history.push('/auth/login');
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


  const loadCustomer = () => {
    Axios.get(`http://localhost:3001/customer/viewbyEmail/${localStorage.getItem('customer')}`).then((respons) => {
      getCustomer(respons.data);
    })
  }

  const getHeader = () => {
    Axios.get('http://localhost:3001/settings/viewHeader').then((respons) => {
      setHeader(respons.data);
    })
  }

  const onFinish = (values) => {

    Axios.put(`http://localhost:3001/customer/edit/details/${localStorage.getItem('customer')}`, values)
      .then(() => {
        handleCancel();
        loadCustomer();
        message.success('You Profile Edit is Success!');
        form.resetFields();
      }).catch((err) => {
        console.log(err);
      })
  }

  const onFinishEmailChange = (values) => {

    Axios.put(`http://localhost:3001/customer/edit/email/${localStorage.getItem('customer')}`, values)
      .then(() => {
        handleCancel();
        message.success('You Profile Edit is Success!');
        history.push('/auth/login');
      }).catch((err) => {
        console.log(err);
      })
  }

  const onFinishPasswordChange = (values) => {

    Axios.get(`http://localhost:3001/customer/edit/detailsvalidate/${localStorage.getItem('customer')}`).then((respons) => {

      if (respons.data[0].password != values.c_password) {
        message.warning("Password is Not Match");
      } else {

        Axios.put(`http://localhost:3001/customer/edit/password/${localStorage.getItem('customer')}`, values)
          .then(() => {
            handleCancel();
            message.success('You Profile Edit is Success!');
            history.push('/auth/login');
          }).catch((err) => {
            console.log(err);
          })
      }
    })
  }

  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          {header.map((val) => {

            const ImageURL = 'http://localhost:3001/settings/' + val.second_header_image;
            return (<>

              <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    `url("${ImageURL}")`,
                }}
              >
                <span
                  id="blackOverlay"
                  className="w-full h-full absolute opacity-50 bg-black"
                ></span>
              </div>
              <div
                className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                style={{ transform: "translateZ(0)" }}
              >
                <svg
                  className="absolute bottom-0 overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="text-blueGray-200 fill-current"
                    points="2560 0 2560 100 0 100"
                  ></polygon>
                </svg>
              </div>
            </>
            )
          }
          )}
        </section>
        <section className="relative py-16 bg-blueGray-200">

          {customer.map((value) => {

            return (<>

              <div className="container mx-auto px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                  <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">

                      </div>
                      <div className="w-full lg:w-3/12 px-4 lg:order-3 lg:text-right lg:self-center">
                        <div className="py-6 px-3 mt-32 sm:mt-0">
                          <button
                            className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => { showModal() }}
                          >
                            <FontAwesomeIcon icon={faEdit} size='lg' style={{ paddingRight: '10px' }} /> Edit Details
                          </button>
                          <button
                            className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => { showChangePasswordModal() }}
                          >
                            <FontAwesomeIcon icon={faUserEdit} size='lg' style={{ paddingRight: '10px' }} /> Change Psssword
                          </button>
                          <button
                            className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => { showChangeEmailModal() }}
                          >
                            <FontAwesomeIcon icon={faFileEdit} size='lg' style={{ paddingRight: '10px' }} /> Change Email
                          </button>
                          <Popconfirm
                            title="Do you want to Delete Account?"
                            onConfirm={(confirm)}
                            onCancel={cancel}
                            okText="Delete Book"
                            cancelText="No"
                          >
                            <Button onClick={() => {

                            }} type="danger"><FontAwesomeIcon icon={faDeleteLeft} size='lg' style={{ paddingRight: '10px' }} /> Delete Account</Button>
                          </Popconfirm>
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-1">

                      </div>
                    </div>
                    <div className="text-center mt-12">
                      <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        {value.name}
                      </h3>
                      <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                        {value.address}
                      </div>

                      <div className="mb-2 text-blueGray-600 mt-10 uppercase">
                        <i className="fas fa-user mr-2 text-lg text-blueGray-400"></i>
                        {value.gender}
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
                        {value.phone}
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        <i className="fas fa-contact mr-2 text-lg text-blueGray-400"></i>
                        {value.email}
                      </div>
                    </div>
                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">

                    </div>
                  </div>
                </div>
              </div>
            </>
            )
          })}
        </section>
      </main>


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
      <Footer />
    </>
  );
}
