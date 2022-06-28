import {
  Card, Col, Row, Space
} from "antd";
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";


function AuthorIncome() {

  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('author')) {
      history.push('/sign-in');
    } else {

      if (localStorage.getItem('author') !== 'admin') {
        Axios.get(`http://localhost:3001/author/getauthorid/${localStorage.getItem('author')}`).then((respons) => {
          LoadPaymentsByID(respons.data[0].author_id);
        })
      } 
    }
  })

  const LoadPaymentsByID = (author_id) => {
    Axios.get(`http://localhost:3001/author/viewwithPaymentbyIDAll/${author_id}`).then((respons) => {
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
              title="Total Income"
            >
            </Card>
          </Col>
        </Row>
        {data.map((val) => {
          return (
            <Row style={{ padding: '20px', marginTop: '1%', backgroundColor: 'white', borderRadius: '10px' }}>
              <Col span={14}>
                <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                  <Row>
                    <Col span={6}>
                      <h1>Number of Items : </h1>
                    </Col>
                    <Col span={12}>
                      {val.count}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <h1>Total Income : </h1>
                    </Col>
                    <Col span={12}>
                      <h1>Rs. {val.sum}</h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <h1>Service Charges : </h1>
                    </Col>
                    <Col span={12}>
                      <h1>Rs. {val.sum * 10 / 100}</h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <h1>Total Balance : </h1>
                    </Col>
                    <Col span={12}>
                      <h1>Rs. {val.sum - val.sum * 10 / 100}</h1>
                    </Col>
                  </Row>
                </Space>
              </Col>
            </Row>
          )
        })}
      </div>
    </>
  );
}

export default AuthorIncome;
