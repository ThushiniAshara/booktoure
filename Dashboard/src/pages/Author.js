import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, message, Popconfirm, Row, Space } from "antd";
import Axios from 'axios';
import React, { useEffect, useState } from 'react';

function Author() {

    const [data, setData] = useState([]);
    const [author_id, setAuthoeID] = useState();

    const confirm = () => {
        deleteAuthor();
        deleteBooks();
    }

    const cancel = (e) => {

    }

    useEffect(() => {
        loadCustomer();
    })

    const deleteAuthor = () => {

        Axios.delete(`http://localhost:3001/author/delete/${author_id}`).then((res) => {
            message.success('Author Delete Success!');
        })
    }

    const deleteBooks = () => {
        Axios.delete(`http://localhost:3001/author/delete/book/${author_id}`).then((res) => {
        })
    }

    const loadCustomer = () => {
        Axios.get('http://localhost:3001/author/view').then((respons) => {
            setData(respons.data)
        })
    }

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Author Details"
                        >
                        </Card>
                    </Col>
                </Row>
                {data.map((val, key) => {
                    let name = [];
                    Axios.get(`http://localhost:3001/statistics/getPayment/${val.author_id}`).then((res) => {
                        name.push(res.data);
                    });
                    name.forEach((val, i) => {
                        console.log(val);
                    })
                    return (
                        <Row style={{ padding: '20px', border: '2px solid gray', marginTop: '1%', backgroundColor: 'white', borderRadius: '10px' }}>
                            <Col span={14}>
                                <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                                    <Row>
                                        <Col span={6}>
                                            <h1>Name :</h1>
                                        </Col>
                                        <Col span={12}>
                                            <h1> {val.name}</h1>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={6}>
                                            <h1>Email : </h1>
                                        </Col>
                                        <Col span={12}>
                                            <h1>{val.email}</h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            <h1>Address : </h1>
                                        </Col>
                                        <Col span={12}>
                                            <h1>{val.address}</h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            <h1>Phone Number : </h1>
                                        </Col>
                                        <Col span={12}>
                                            <h1>{val.phone}</h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            <h1>Description : </h1>
                                        </Col>
                                        <Col span={12}>
                                            <h1> {val.description}</h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            <h1>Gender : </h1>
                                        </Col>
                                        <Col span={12}>
                                            <h1> {val.gender}</h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            <h1>Accept : </h1>
                                        </Col>
                                        <Col span={12}>
                                            <h1>{val.accept}</h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            <h1>Facebook : </h1>
                                        </Col>
                                        <Col span={12}>
                                            <h1><a href={val.facebook}>{val.facebook}</a></h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            <h1>Twitter : </h1>
                                        </Col>
                                        <Col span={12}>
                                            <h1><a href={val.twitter}>{val.twitter}</a></h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            <h1>Accept : </h1>
                                        </Col>
                                        <Col span={12}>
                                            <h1>{val.accept}</h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            <h1>Date : </h1>
                                        </Col>
                                        <Col span={12}>
                                            <h1>{val.cdate}</h1>
                                        </Col>
                                    </Row>
                                    <Divider />
                                    <Row>
                                        <Col span={6}>
                                            <h1>Number of Books Published : </h1>
                                        </Col>
                                        <Col span={12}>
                                            {name.count}
                                        </Col>
                                    </Row>

                                    {/* <Row>
                                        <Col span={12}>
                                            <>
                                                <Popconfirm
                                                    title="Are you sure to delete this Book?"
                                                    onConfirm={(confirm)}
                                                    onCancel={cancel}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button onClick={() => {
                                                        setAuthoeID(val.author_id);
                                                    }} type="primary" icon={<DeleteOutlined />}>Delete</Button>
                                                </Popconfirm>
                                            </>
                                        </Col>
                                    </Row> */}
                                </Space>
                            </Col>
                        </Row>
                    )
                })}
            </div>
        </>
    );
}

export default Author;
