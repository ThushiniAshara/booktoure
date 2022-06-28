import {
  Card, Col, Divider, Row, Space
} from "antd";
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

function Payments() {

  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('author')) {
      history.push('/sign-in');
    } else {

      if (localStorage.getItem('author') != 'admin') {
        Axios.get(`http://localhost:3001/author/getauthorid/${localStorage.getItem('author')}`).then((respons) => {
          LoadPaymentsByID(respons.data[0].author_id);
        })
      } else {

        LoadPayments();
      }
    }
  }, [])

  const LoadPayments = () => {
    Axios.get('http://localhost:3001/author/viewwithPayment').then((respons) => {
      setData(respons.data)
    })
  }

  const LoadPaymentsByID = (author_id) => {
    Axios.get(`http://localhost:3001/author/viewwithPaymentbyID/${author_id}`).then((respons) => {
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
              title="Monthly Payment Details"
            >
            </Card>
            <div className="table-responsive">
              <Row>
                <Col style={{ padding: '10px' }}>
                  <Row>
                    <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>CURRENT  MONTH : </h1>
                  </Row>
                </Col>
                <Col style={{ padding: '10px' }}>
                  <Row style={{ textAlign: 'center' }}>
                    <h1 style={{ color: 'green', textAlign: 'center', fontWeight: 'bold' }}>{new Date().toLocaleString('en-us', { month: 'short', year: 'numeric' })}</h1>
                  </Row>

                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        {data.map((val) => {
          return (
            <Row style={{ padding: '20px', border: '2px solid gray', marginTop: '1%', backgroundColor: 'white', borderRadius: '10px' }}>
              <Col span={14}>
                <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                  {localStorage.getItem('author') == 'admin' ?
                    <>
                      <Row>
                        <Col span={6}>
                          <h1>Author Details :</h1>
                        </Col>
                        <Col span={12}>
                          <h1>{val.name} <br />{val.address} <br />{val.phone} <br />{val.email}<br /></h1>
                        </Col>
                      </Row>
                      <Divider />
                    </>
                    : <></>}
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
                      <h1>This Month Income : </h1>
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
                      <h1>Balance : </h1>
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

export default Payments;
