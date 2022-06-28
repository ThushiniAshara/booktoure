import { DeleteOutlined } from '@ant-design/icons';
import {
  Button, Card, Col, message, Popconfirm, Row, Table} from "antd";
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
  
  function Contact() {

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
        title: "Full Name",
        dataIndex: "fullname",
        key: "fullname",
    },
    
    {
        title: "Message",
        key: "message",
        dataIndex: "message",
        width: "32%",
    },
    {
      title: "Date",
      key: "cdate",
      dataIndex: "cdate",
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
                setEmail(recode);
              }} type="primary" icon={<DeleteOutlined />}>Delete</Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

    const [data, setData] = useState([]);
    const [email, setEmail] = useState();

    const confirm = () => {
      deleteContact(email)
    }
    const cancel = () => {
        setEmail("")
    }
    
    useEffect(() => {
        loadContact();
    })

    const deleteContact = (recode) => {
      const email = recode.email;
      console.log(email)
      Axios.delete(`http://localhost:3001/contact/delete/${email}`).then((res) => {
        message.success('Customer Delete Success!');
      })
    }

    const loadContact = () => {
      Axios.get('http://localhost:3001/contact/view').then((respons) => {
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
                title="Messages"
                >

                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    className="ant-border-space"
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
  
  export default Contact;
  