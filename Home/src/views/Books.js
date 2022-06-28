import { faBook, faMessage, faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, message, PageHeader } from "antd";
import Axios from 'axios';
import Footer from "components/Footers/Footer.js";
import Navbar from "components/Navbars/IndexNavbar.js";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";



export default function Books() {

    const history = useHistory();
    const [header, setHeader] = useState([]);
    const [getBook, setGetBook] = useState([]);

    const [searchKey, setSearchKey] = useState([]);

    const [customerEmail, getCustomeremail] = useState();

    useEffect(() => {
        getCustomeremail(localStorage.getItem('customer'));
        loadData();
    }, [])

    const addtoCart = (book_id) => {

        if (!localStorage.getItem('customer')) {
            history.push('/auth/login');
        } else {

            const data = {
                'book_id': book_id,
                'customer_email': customerEmail,
            }

            Axios.post("http://localhost:3001/cart/addtocart", data)
                .then((respons) => {
                    message.success('Product Added to Cart!');
                }).catch((err) => {
                    console.log(err);
                })

        }
    }

    const loadData = () => {
        getHeader();
        loadBook();
    }

    const loadBook = () => {
        Axios.get("http://localhost:3001/book/ViewAccept/").then((respons) => {
            setGetBook(respons.data);
        })
    }

    const getHeader = () => {
        Axios.get('http://localhost:3001/settings/viewHeader').then((respons) => {
            setHeader(respons.data);
        })
    }
    const searchBooks = (values) => {

        if (values != "") {
            Axios.get(`http://localhost:3001/book/search/${values}`).then((respons) => {
                setGetBook(respons.data);
            })
        } else {
            loadBook()
        }
    }

    const routes = [
        {
            path: '/',
            breadcrumbName: 'Home',
        },
        {
            path: 'books',
            breadcrumbName: 'Books',
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
                                ></span>
                            </div>
                        </section>
                        <section className="relative bg-danger block h-100-px">
                            <PageHeader
                                onBack={() => window.history.back()}
                                className="site-page-header"
                                title="Books"
                                breadcrumb={{ routes }}
                                style={{ backgroundColor: '#fff', borderTop: '5px solid black' }}
                                extra={[
                                    <Form name="payform" >
                                        <Form.Item name="search">
                                            <Input onChange={(e) => { searchBooks(e.target.value) }} placeholder="Search Books Here.." />

                                        </Form.Item>
                                    </Form>,
                                ]}
                            />
                        </section>
                    </>
                    )
                })}
                <section className="relative py-16 bg-blueGray-200">
                    {getBook.map((value, key) => (
                        <div className="container mx-auto px-4" style={{ marginTop: '20%' }}>
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
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
                                                    onClick={() => { addtoCart(value.book_id) }}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                                {value.title}
                                            </h3>
                                            <div style={{ color: 'red', fontSize: '20px' }} className=" text-sm leading-normal mt-0 mb-2 text-red-400 font-bold uppercase">
                                                Rs.  {value.price}
                                            </div>
                                            <div className="mb-2 text-blueGray-600 mt-10">
                                                <h5>
                                                    <FontAwesomeIcon icon={faUser} size='lg' style={{ paddingRight: '10px' }} /> Author : {value.name}
                                                </h5>
                                            </div>
                                            <div className="mb-2 text-blueGray-600">
                                                <h5>
                                                    <FontAwesomeIcon icon={faPaperPlane} size='lg' style={{ paddingRight: '10px' }} />About Author : {value.description}
                                                </h5>
                                            </div>
                                            <div className="mb-2 text-blueGray-600">
                                                <h5>
                                                    <FontAwesomeIcon icon={faMessage} size='lg' style={{ paddingRight: '10px' }} />Author Email : {value.email}
                                                </h5>
                                            </div>
                                            <div className="mb-2 text-blueGray-600">
                                                <h5>
                                                    <FontAwesomeIcon icon={faBook} size='lg' style={{ paddingRight: '10px' }} />ISBN NUmber : {value.isbn_number}
                                                </h5>
                                            </div>
                                            <div className="mb-2 text-blueGray-600">
                                                <h5>
                                                    <i className="fab fa-facebook"></i>  Facebook : <a href={value.facebook}>{value.facebook}</a>
                                                </h5>
                                            </div>
                                            <div className="mb-2 text-blueGray-600">
                                                <h5>
                                                    <i className="fab fa-twitter"></i> Twitter : <a href={value.twitter}>{value.twitter}</a>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">

                                            <div className="mb-2 text-blueGray-600">
                                                <h5>
                                                    Book Description
                                                </h5>
                                                <h4>{value.book_description}</h4>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">

                                            <div className="mb-2 text-blueGray-600">
                                                <img src={'http://localhost:3001/upload/' + value.image} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                    {value.highlight}
                                                </p>
                                                {/* <a
                                                    href="#pablo"
                                                    className="font-normal text-lightBlue-500"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Show more
                                                </a> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            <Footer />
        </>
    );
}
