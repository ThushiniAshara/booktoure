import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Button, Card, Col, Form,
    Input, message, Modal, Row, Space, Upload
} from "antd";
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

function Settings() {

    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    const [form4] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalAboutVisible, setisModalAboutVisible] = useState(false);
    const [isModalServiceVisible, setisModalServiceVisible] = useState(false);
    const [isModalContactVisible, setisModalContactVisible] = useState(false);
    const [isModalVisibleImageUpload, setIsModalVisibleImageUpload] = useState(false);

    const [header, setHeader] = useState([]);

    const history = useHistory();

    useEffect(() => {
        getHeader();
    })

    const getHeader = () => {
        Axios.get('http://localhost:3001/settings/viewHeader').then((respons) => {
            setHeader(respons.data);
        })
    }


    const showModal = () => {
        setIsModalVisible(true);
    };

    const showAboutModal = () => {
        setisModalAboutVisible(true);
    };

    const showContactModal = () => {
        setisModalContactVisible(true);
    };

    const showModalService = () => {
        setisModalServiceVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };
    const AbouthandleCancel = () => {
        setisModalAboutVisible(false);
        form2.resetFields();
    };
    const ServicehandleCancel = () => {
        setisModalServiceVisible(false);
        form3.resetFields();
    };
    const ContacthandleCancel = () => {
        setisModalContactVisible(false);
        form4.resetFields();
    };

    const handleUpload = ({ fileList }) => {
        setFileList(fileList);
    }

    const subPageHeaderChange = {
        name: "subheader",
        action: "http://localhost:3001/settings/changesubheader",
        headers: {
            authorization: "authorization-text",
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
                window.location.href = '/settings';
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const loginImageChange = {
        name: "logheader",
        action: "http://localhost:3001/settings/changeLoginHeader",
        headers: {
            authorization: "authorization-text",
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
                window.location.href = '/settings';
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const AdminloginImageChange = {
        name: "adminlogin",
        action: "http://localhost:3001/settings/changeadminLoginHeader",
        headers: {
            authorization: "authorization-text",
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
                window.location.href = '/settings';
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const onFinishService = (values) => {
        const data = new FormData();

        if (fileList[0] != null) {

            data.append('service_image', fileList[0].originFileObj);
            data.append('description', values.description);

            Axios.post('http://localhost:3001/settings/changeservice', data)
                .then((respons) => {
                    setisModalServiceVisible();
                    history.push('/settings');
                    form3.resetFields();
                    message.success('Service Detail Change Success!');
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            message.warning('Please Select Image to Change About!');
        }

    };
    const onFinishAbout = (values) => {
        const data = new FormData();

        if (fileList[0] != null) {

            data.append('about', fileList[0].originFileObj);
            data.append('description', values.description);

            Axios.post('http://localhost:3001/settings/changeabout', data)
                .then((respons) => {
                    AbouthandleCancel();
                    history.push('/settings');
                    form2.resetFields();
                    message.success('About Detail Change Success!');
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            message.warning('Please Select Image to Change About!');
        }

    };

    const onFinish = (values) => {
        const data = new FormData();


        if (fileList[0] != null) {

            data.append('header', fileList[0].originFileObj);
            data.append('title', values.title);
            data.append('description', values.description);

            Axios.post('http://localhost:3001/settings/change', data)
                .then((respons) => {
                    handleCancel();
                    history.push('/settings');
                    message.success('Header Change Success!');
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            message.warning('Please Select Image to Change Header!');
        }

    };

    const onFinishContact = (values) => {

        const data = {
            'email': values.email,
            'facebook': values.facebook,
            'twitter': values.twitter,
        }

        Axios.post('http://localhost:3001/settings/contact', data)
            .then((respons) => {
                ContacthandleCancel();
                history.push('/settings');
                message.success('Contact Changes Success!');
            }).catch((err) => {
                console.log(err);
            })


    };


    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Settings"
                        >
                            <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                                <Row style={{ padding: '10px' }}>
                                    <Col span={6}>
                                        <Button type="primary" icon={<PlusOutlined />} onClick={showModal} >Change Hompage Header</Button>
                                    </Col>
                                </Row>
                                <Row style={{ padding: '10px' }}>
                                    <Col span={12}>
                                        {header.map((val, key) => (
                                            <>
                                                <Row><h>Header Title : {val.title}</h></Row>
                                                <Row><h>Header Description : {val.description}</h></Row>
                                                <img src={'http://localhost:3001/settings/' + val.header_image} />
                                            </>
                                        ))}
                                    </Col>
                                </Row>
                                <Row style={{ padding: '10px' }}>
                                    <Col span={6}>
                                        <Button type="primary" icon={<PlusOutlined />} onClick={showContactModal} >Change Company Contact Details</Button>
                                    </Col>
                                </Row>
                                <Row style={{ padding: '10px' }}>
                                    <Col span={12}>
                                        {header.map((val, key) => (
                                            <>
                                                <Row><h>Email Address : {val.email}</h></Row>
                                                <Row><h>Facebook : <a href="{val.facebook}">{val.facebook}</a></h></Row>
                                                <Row><h>Twitter : <a href="{val.twitter}">{val.twitter}</a></h></Row>
                                            </>
                                        ))}
                                    </Col>
                                </Row>

                                <Row style={{ padding: '10px' }}>
                                    <Col span={6}>
                                        <Button type="primary" icon={<PlusOutlined />} onClick={showModalService} >Change Service Details</Button>
                                    </Col>
                                </Row>
                                <Row style={{ padding: '10px' }}>
                                    <Col span={12}>
                                        {header.map((val, key) => (
                                            <>
                                                <Row><h>{val.service_description}</h></Row>
                                                <img src={'http://localhost:3001/settings/' + val.service_image} />
                                            </>
                                        ))}
                                    </Col>
                                </Row>

                                <Row style={{ padding: '10px' }}>
                                    <Col span={6}>
                                        <Button type="primary" icon={<PlusOutlined />} onClick={showAboutModal} >Change About Details</Button>
                                    </Col>
                                </Row>
                                <Row style={{ padding: '10px' }}>
                                    <Col span={12}>
                                        {header.map((val, key) => (
                                            <>
                                                <Row><h>Header Description : {val.about_description}</h></Row>
                                                <img src={'http://localhost:3001/settings/' + val.about_image} />
                                            </>
                                        ))}
                                    </Col>
                                </Row>
                                <Row style={{ padding: '10px' }}>
                                    <Col span={6}>
                                        <Form
                                            name="subheaderForm">
                                            <Form.Item name="subheader">
                                                <Upload
                                                    {...subPageHeaderChange}
                                                >
                                                    <Button type="primary" icon={<UploadOutlined />}>Upload Sub Header</Button>
                                                </Upload>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row style={{ padding: '10px' }}>
                                    <Col span={12}>
                                        {header.map((val, key) => (
                                            <>
                                                <img src={'http://localhost:3001/settings/' + val.second_header_image} />
                                            </>
                                        ))}
                                    </Col>
                                </Row>

                                <Row style={{ padding: '10px' }}>
                                    <Col span={6}>
                                        <Form
                                            name="loginimageform">
                                            <Form.Item name="logheader">
                                                <Upload
                                                    {...loginImageChange}
                                                >
                                                    <Button type="primary" icon={<UploadOutlined />}>Upload Customer Login Page Image</Button>
                                                </Upload>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row style={{ padding: '10px' }}>
                                    <Col span={12}>
                                        {header.map((val, key) => (
                                            <>
                                                <img src={'http://localhost:3001/settings/' + val.loginImage} />
                                            </>
                                        ))}
                                    </Col>
                                </Row>
                                <Row style={{ padding: '10px' }}>
                                    <Col span={6}>
                                        <Form
                                            name="adminloginForm">
                                            <Form.Item name="adminlogin">
                                                <Upload
                                                    {...AdminloginImageChange}
                                                >
                                                    <Button type="primary" icon={<UploadOutlined />}>Upload Admin Login Image</Button>
                                                </Upload>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row style={{ padding: '10px' }}>
                                    <Col span={12}>
                                        {header.map((val, key) => (
                                            <>
                                                <img src={'http://localhost:3001/settings/' + val.adminLoginImage} />
                                            </>
                                        ))}
                                    </Col>
                                </Row>

                            </Space>
                            <Modal title="Home Page Manage" okText="Finish" onOk={form.submit} visible={isModalVisible} onCancel={handleCancel}>
                                <Form
                                    name="UploadForm"
                                    onFinish={onFinish}
                                    // onFinishFailed={onFinishFailed}
                                    form={form} >
                                    <Form.Item label="Title" name="title"
                                        rules={[{ required: true, message: 'Please Enter Title' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Description" name="description"
                                        rules={[{ required: true, message: 'Please Enter Description' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Header Image" name="header">
                                        <Upload
                                            istType="picture-card"
                                            fileList={fileList}
                                            // onPreview={handlePreview}
                                            onChange={handleUpload}
                                            beforeUpload={() => false}
                                        >
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        </Upload>
                                    </Form.Item>
                                </Form>
                            </Modal>
                            <Modal title="About Manage" okText="Finish" onOk={form2.submit} visible={isModalAboutVisible} onCancel={AbouthandleCancel}>
                                <Form
                                    name="UploadForm"
                                    onFinish={onFinishAbout}
                                    // onFinishFailed={onFinishFailed}
                                    form={form2} >
                                    <Form.Item label="Description" name="description"
                                        rules={[{ required: true, message: 'Please Enter Description' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="About Image" name="header">
                                        <Upload
                                            istType="picture-card"
                                            fileList={fileList}
                                            // onPreview={handlePreview}
                                            onChange={handleUpload}
                                            beforeUpload={() => false}
                                        >
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        </Upload>
                                    </Form.Item>
                                </Form>
                            </Modal>

                            <Modal title="Service Manage" okText="Finish" onOk={form3.submit} visible={isModalServiceVisible} onCancel={ServicehandleCancel}>
                                <Form
                                    name="UploadForm"
                                    onFinish={onFinishService}
                                    // onFinishFailed={onFinishFailed}
                                    form={form3} >
                                    <Form.Item label="Description" name="description"
                                        rules={[{ required: true, message: 'Please service Enter Description' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Service Image" name="service_image">
                                        <Upload
                                            istType="picture-card"
                                            fileList={fileList}
                                            // onPreview={handlePreview}
                                            onChange={handleUpload}
                                            beforeUpload={() => false}
                                        >
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        </Upload>
                                    </Form.Item>
                                </Form>
                            </Modal>

                            <Modal title="Contact Manage" okText="Finish" onOk={form4.submit} visible={isModalContactVisible} onCancel={ContacthandleCancel}>
                                <Form
                                    name="ContactForm"
                                    onFinish={onFinishContact}
                                    // onFinishFailed={onFinishFailed}
                                    form={form4} >
                                    <Form.Item label="Email Address" name="email"
                                        rules={[{ required: true, message: 'Please Enter Email' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Facebook Link" name="facebook"
                                        rules={[{ required: true, message: 'Please Enter Facebook' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Twitter Link" name="twitter"
                                        rules={[{ required: true, message: 'Please Enter Twitter' }]}>
                                        <Input />
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </Card>
                    </Col>
                </Row>
            </div >
        </>
    );
}

export default Settings;
