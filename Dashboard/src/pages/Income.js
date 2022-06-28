import {
    Card, Col, Row, Space
} from "antd";
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

function Income() {

    const history = useHistory();
    const [payments, setPayments] = useState([]);
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('author')) {
            history.push('/sign-in');
        } else {
            getPayments();
        }
    }, [])


    const loadStatistics = () => {
        Axios.get('http://localhost:3001/statistics/view').then((respons) => {
            setStatistics(respons.data[0]);
        })
    }

    const getPayments = () => {
        Axios.get('http://localhost:3001/payment/view').then((respons) => {
            setPayments(respons.data);
            loadStatistics();
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
                            title="Income Details"
                        >

                            <div className="table-responsive">
                                <Row style={{ padding: '10px' }}>
                                    <Col style={{ padding: '10px' }}>
                                        <Row>
                                            <h1>Number of Sales</h1>
                                        </Row>
                                        <Row style={{ textAlign: 'center' }}>
                                            <h1>{statistics.count}</h1>
                                        </Row>

                                    </Col>
                                    <Col style={{ padding: '10px' }}>
                                        <Row>
                                            <h1>Total Income</h1>
                                        </Row>
                                        <Row style={{ textAlign: 'center' }}>
                                            <h1>RS. {statistics.sum}</h1>
                                        </Row>

                                    </Col>
                                </Row>
                            </div>
                            <div className="table-responsive">
                                {payments.map((val) => {
                                    return (
                                        <Row style={{ padding: '20px', border: '2px solid gray', marginTop: '1%', backgroundColor: 'white', borderRadius: '10px' }}>
                                            <Col span={14}>
                                                <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                                                    <Row>
                                                        <Col span={6}>
                                                            <h1>Payment ID :</h1>
                                                        </Col>
                                                        <Col span={12}>
                                                            <h1> #{val.payment_id}</h1>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col span={6}>
                                                            <h1>Number of Item : </h1>
                                                        </Col>
                                                        <Col span={12}>
                                                            <h1>{val.count}</h1>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col span={6}>
                                                            <h1>Total Amount : </h1>
                                                        </Col>
                                                        <Col span={12}>
                                                            <h1> <span style={{ color: 'red' }}>Rs. {val.total}</span> </h1>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col span={6}>
                                                            <h1>Customer :</h1>
                                                        </Col>
                                                        <Col span={12}>
                                                            <h1>{val.name} <br />{val.address} <br />{val.phone} <br />{val.email}<br /></h1>
                                                        </Col>
                                                    </Row>
                                                </Space>
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}



export default Income;
