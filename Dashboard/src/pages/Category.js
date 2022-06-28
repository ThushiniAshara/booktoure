// Images
import { DeleteOutlined, EditOutlined, FileImageOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Button, Card, Col, Form, Image, Input, message, Modal, Popconfirm, Row, Space, Table, Upload
} from "antd";
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

function Category() {

    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleImageUpload, setIsModalVisibleImageUpload] = useState(false);
    const [category, setCategory] = useState([]);
    const [isedit, setIsEdit] = useState(true);

    const [catid, setCategoryID] = useState();
    const history = useHistory();
    const [cat_id, setCatID] = useState();

    // table code start
    const columns = [
        {
            title: "Category Name",
            dataIndex: "cat_name",
            key: "cat_name",
            width: "32%",
        },
        {
            title: "Image",
            key: "cat_image",
            render: (recode) => {
                const imageURL = 'http://localhost:3001/upload/category/' + recode.cat_image;
                return (
                    <>
                        <Image
                            width={200}
                            src={imageURL}
                        />
                    </>
                );
            },
        },
        {
            title: "Change Category details",
            key: "changeimage",
            render: (recode) => {
                return (
                    <>
                        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                            <Button onClick={() => {
                                showModal();
                                setIsEdit(false);
                                setCategoryID(recode.cat_id);
                            }} type="primary" icon={<EditOutlined />}>Edit Details</Button>

                            <Button onClick={() => {
                                showModalImage();
                                setCategoryID(recode.cat_id);
                            }} type="primary" icon={<FileImageOutlined />}>Change Image</Button>
                        </Space>
                    </>
                );
            },
        },
        {
            title: "Delete",
            key: "delete",
            render: (recode) => {
                return (
                    <>
                        <Popconfirm
                            title="Are you sure to delete this Book?"
                            onConfirm={(confirm)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button onClick={() => {
                                setCatID(recode.cat_id);
                            }} type="primary" icon={<DeleteOutlined />}>Delete</Button>
                        </Popconfirm>
                    </>
                );
            },
        },
    ];

    const confirm = (recode) => {
        deleteCategory(cat_id);
    }

    const cancel = (e) => {
        history.push('/category');
    }

    const handleCancelImageUpload = () => {
        setIsModalVisibleImageUpload(false);
        history.push('/category');
    }

    const deleteCategory = (cat_id) => {
        Axios.delete(`http://localhost:3001/category/delete/${cat_id}`).then((res) => {
            message.success('Category Delete Success!');
        })
    }

    const handleUpload = ({ fileList }) => {
        setFileList(fileList);
        history.push('/category');
    }

    useEffect(() => {
        getCategory();
    })

    const getCategory = () => {
        Axios.get('http://localhost:3001/category/viewAdmin').then((respons) => {
            setCategory(respons.data);
        })
    }

    const showModal = () => {
        getCategory();
        setIsModalVisible(true);
    };
    const showModalImage = () => {
        getCategory();
        setIsModalVisibleImageUpload(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsEdit(true);
        form.resetFields();
    };

    const editcategoryimage = {
        name: "image",
        action: `http://localhost:3001/category/edit/editimageupload/${catid}`,
        headers: {
            authorization: "authorization-text",
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                setCategoryID("");
                message.success(`${info.file.name} file uploaded successfully`);
                form.resetFields();
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const onFinish = (values) => {
        const data = new FormData();

        data.append('file', fileList[0].originFileObj);
        data.append('cat_name', values.cat_name);

        Axios.post('http://localhost:3001/category/new', data)
            .then((respons) => {
                handleCancel();
                history.push('/category');
                message.success('Category Adding Success!');
            }).catch((err) => {
                console.log(err);
            })

    };

    const onFinishEditUpload = () => {
        setIsModalVisibleImageUpload(false);
        history.push('/category');
    }

    const onFinishEdit = (values) => {
        if (values.cat_name) {
            Axios.put(`http://localhost:3001/category/edit/${catid}`, values
            ).then((respons) => {
                handleCancel();
                setCategoryID("");
                history.push('/category');
                message.success('Category Name Save Success!');
            })
        }
    }

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Category Details"
                            extra={
                                <>
                                    <Button type="primary" icon={<PlusOutlined />} onClick={showModal} >Add New</Button>
                                    <Modal title="Category" okText="Save Changes" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                                        {isedit ? <Form
                                            name="basic_edit"
                                            onFinish={onFinish}
                                            form={form}
                                        >
                                            <Form.Item label="Category Name" name="cat_name"
                                                rules={[{ required: true, message: 'Please Enter Category Name' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label="Image" name="file">
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

                                            :

                                            <Form
                                                name="editCategory"
                                                onFinish={onFinishEdit}
                                                // onFinishFailed={onFinishFailed}
                                                form={form} >

                                                <Form.Item label="Edit Category Name" name="cat_name">
                                                    <Input />
                                                </Form.Item>
                                            </Form>}
                                    </Modal>

                                    <Modal title="Change Images" okText="Finish" visible={isModalVisibleImageUpload} onOk={form2.submit} onCancel={handleCancelImageUpload}>
                                        <Form
                                            name="edituploadimage"
                                            onFinish={onFinishEditUpload}
                                            // onFinishFailed={onFinishFailed}
                                            form={form2} >

                                            <Form.Item label="Image" name="image">
                                                <Upload
                                                    {...editcategoryimage}>
                                                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                                                </Upload>
                                            </Form.Item>
                                        </Form>
                                    </Modal>
                                </>
                            }
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={category}
                                    pagination={false}
                                    className="ant-border-space"
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div >
        </>
    );
}

export default Category;
