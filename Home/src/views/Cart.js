import { faCartShopping, faClose, faCreditCard, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Form, Input, message, Modal, PageHeader, Row, Select, Statistic } from "antd";
import { Option } from "antd/lib/mentions";
import Axios from 'axios';
import Footer from "components/Footers/Footer.js";
import Navbar from "components/Navbars/IndexNavbar.js";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


export default function Cart() {

    const [form] = Form.useForm();
    const history = useHistory();
    const [header, setHeader] = useState([]);
    const [getBook, setGetBook] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [customerEmail, getCustomeremail] = useState();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const onFinish = () => {

        const bookIDS = getBook.map(myFunction)
        function myFunction(value, index, array) {
            return value.book_id;
        }

        if (bookIDS) {

            const paymentdata = {
                'customer_email': customerEmail,
                'total': totalPrice.total,
            }

            Axios.post("http://localhost:3001/payment/pay", paymentdata).then((respons) => {
                console.log(respons.data.insertId);
                getBook.map((val, i) => {

                    const data = {
                        'book_id': val.book_id,
                        'customer_email': customerEmail,
                        'payment_id': respons.data.insertId,
                        'author_id': val.author_id,
                    }
                    
                    Axios.post("http://localhost:3001/payment/download", data).then((respons) => {
                    })
                })
                message.success("Payment is Success! Now You can Download Your Books..");
            })


            Axios.delete(`http://localhost:3001/cart/delete/all/${localStorage.getItem('customer')}`).then((respons) => {

            });
            handleCancel();
            history.push('/downloads')
        } else {
            message.warning('Please Add Item to Buy!');
        }
    }

    useEffect(() => {
        getCustomeremail(localStorage.getItem('customer'));

        if (!localStorage.getItem('customer')) {
            history.push('/auth/login');
        }
        loadData();
    }, [customerEmail])

    const countTotale = () => {

        Axios.get(`http://localhost:3001/cart/total/${customerEmail}`).then((respons) => {
            if (respons.data) {
                setTotalPrice(respons.data[0]);
            } else {
                setTotalPrice(0);
            }
        })

    }

    const remove = (cart_id) => {
        Axios.delete(`http://localhost:3001/cart/delete/${cart_id}`).then((res) => {
            message.success('Cart Item Removed!');
            loadData();
        })

    }

    const loadData = () => {
        getHeader();
        loadBook();
        countTotale();
    }

    const loadBook = () => {
        Axios.get(`http://localhost:3001/cart/view/${localStorage.getItem('customer')}`).then((respons) => {
            setGetBook(respons.data);
        })
    }

    const getHeader = () => {
        Axios.get('http://localhost:3001/settings/viewHeader').then((respons) => {
            setHeader(respons.data);
        })
    }

    const routes = [
        {
            path: '/',
            breadcrumbName: 'Home',
        },
        {
            path: 'cart',
            breadcrumbName: 'Cart',
        },
    ];

    return (
        <>
            <Navbar onLoad={loadData} transparent />
            <main className="profile-page">
                {header.map((val, key) => {
                    const ImageURL = 'http://localhost:3001/settings/' + val.second_header_image;
                    return (<>
                        <section className="relative block h-500-px">
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
                                >Cart</span>
                            </div>
                        </section>
                        <section className="relative block h-500-px">
                            <PageHeader
                                onBack={() => window.history.back()}
                                className="site-page-header"
                                title="Cart"
                                breadcrumb={{ routes }}
                                style={{ backgroundColor: '#fff', marginTop: '1%', padding: '3%' }}
                                extra={[
                                    <Button key="3" onClick={() => history.push('/downloads')} size="large"> <FontAwesomeIcon icon={faDownload} size='lg' style={{ paddingRight: '10px' }} /> Downloads</Button>,
                                    <Button key="3" onClick={() => history.push('/')} size="large"> <FontAwesomeIcon icon={faCartShopping} size='lg' style={{ paddingRight: '10px' }} /> Continue Shopping</Button>,
                                    <Button onClick={showModal} key="1" type="primary" size="large">
                                        <FontAwesomeIcon icon={faCreditCard} size='lg' style={{ paddingRight: '10px' }} /> Checkout
                                    </Button>,
                                ]}
                            >
                                <Row>
                                    {totalPrice.count > 0 ?
                                        <>
                                            <Statistic title="Number of Items" value={totalPrice.count} />
                                            <Statistic

                                                title="Balance"
                                                prefix="Rs"
                                                value={totalPrice.total}
                                                style={{
                                                    margin: '0 32px',
                                                }}
                                            />
                                            {/* <Statistic title="Balance" prefix="$" value={total} /> */}</>
                                        : <></>}
                                </Row>
                            </PageHeader>
                        </section>
                    </>
                    )
                })}
                {totalPrice.count > 0 ?
                    <></>
                    : <>
                        <section className="relative py-5" style={{ backgroundColor: '#fff', padding: '2%', marginTop: '-100px' }}>
                            <h5>No Item Found in Cart.. </h5>
                        </section>
                    </>}
                <section className="relative py-1" style={{ backgroundColor: '#fff' }}>
                    {
                        getBook.map((value, key) => {

                            return (
                                <div className="container mx-auto px-4" style={{ marginTop: '20%' }}>
                                    <div style={{ backgroundColor: '#f0f0f0' }} className="relative flex flex-col min-w py-2-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                        <div className="px-6">
                                            <div className="flex flex-wrap justify-center">
                                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                                    <div className="relative">
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                                    <div className="py-6 px-3 mt-32 sm:mt-0">
                                                        <button
                                                            className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                            type="primary"
                                                            onClick={() => { remove(value.cart_id) }}
                                                        >
                                                            <FontAwesomeIcon icon={faClose} size='2x' />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap justify-left mb-5">
                                                <div className="w-full lg:w-3/12 px-4 lg:order-1">
                                                    <div className="mb-2 text-blueGray-600">
                                                        <img src={'http://localhost:3001/upload/' + value.image} />
                                                    </div>
                                                </div>
                                                <div className="w-500 lg:w-5/12 px-4 lg:order-1">
                                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                                        {value.title}
                                                    </h3>
                                                    <div style={{ color: 'red', fontSize: '20px' }} className=" text-sm leading-normal mt-0 mb-2 text-red-400 font-bold uppercase">
                                                        Rs.  {value.price}
                                                    </div>
                                                    <div className="mb-2 text-blueGray-600 mt-10">
                                                        <i className="fas fa-user mr-2 text-lg text-blueGray-400"></i>
                                                        {value.name}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
                </section>
            </main>

            <Modal title="Secure Payment Info" okText="Finish" onOk={form.submit} visible={isModalVisible} onCancel={handleCancel}>
                <Form
                    style={{ border: '2px solid gray', padding: '3%', borderRadius: '10px' }}
                    name="payform"
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    form={form} >
                    <Form.Item >
                        <FontAwesomeIcon icon={faCreditCard} size='2x' />
                    </Form.Item>

                    <Form.Item name="holdname"
                        rules={[{ required: true, message: 'Please Enter Card Holder Name' }]}>
                        <Input placeholder="Card Holder Name" />
                    </Form.Item>


                    <Form.Item name="cardnb"
                        rules={[{ required: true, message: 'Please Enter Card Number' }]}>
                        <Input placeholder="Card Number" />
                    </Form.Item>
                    <Row>
                        <Col>
                            <Form.Item label="" name="month"
                                rules={[{ required: true, message: 'Please Select Month' }]}>
                                <Select placeholder="Month">
                                    <Option value="china">01</Option>
                                    <Option value="usa">02</Option>
                                    <Option value="usa">03</Option>
                                    <Option value="usa">04</Option>
                                    <Option value="usa">05</Option>
                                    <Option value="usa">06</Option>
                                    <Option value="usa">07</Option>
                                    <Option value="usa">08</Option>
                                    <Option value="usa">09</Option>
                                    <Option value="usa">10</Option>
                                    <Option value="usa">11</Option>
                                    <Option value="usa">12</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item style={{ marginLeft: '10px' }} label="" name="year"
                                rules={[{ required: true, message: 'Please Select Year' }]}>
                                <Select placeholder="Year">
                                    <Option value="china">2021</Option>
                                    <Option value="usa">2022</Option>
                                    <Option value="usa">2023</Option>
                                    <Option value="usa">2024</Option>
                                    <Option value="usa">2025</Option>
                                    <Option value="usa">2026</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item style={{ marginLeft: '10px' }} label="" name="scode"
                                rules={[{ required: true, message: 'Please Enter Security Code' }]}>
                                <Input placeholder="Security Code" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Footer />
        </>
    );
}
