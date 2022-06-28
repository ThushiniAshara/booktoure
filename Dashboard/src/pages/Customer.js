import { DeleteOutlined } from '@ant-design/icons';
import {
  Button, Card, Col, message, Popconfirm, Row, Table} from "antd";
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
  
  function Customer() {

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "32%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  
    {
      title: "Phone Number",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Reg. Date",
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
                setCustomerID(recode);
              }} type="primary" icon={<DeleteOutlined />}>Delete</Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

    const [data, setData] = useState([]);
    const [customer_id, setCustomerID] = useState();

    const confirm = () => {
      deleteCustomer(customer_id)
    }
    const cancel = () => {

    }
    
    useEffect(() => {
      loadCustomer();
    })

    const deleteCustomer = (recode) => {
      const email = recode.email;
      Axios.delete(`http://localhost:3001/customer/delete/${email}`).then((res) => {
        message.success('Customer Delete Success!');
      })
    }

    const loadCustomer = () => {
      Axios.get('http://localhost:3001/customer/view').then((respons) => {
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
                title="Customer Details"
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
  
  export default Customer;
  