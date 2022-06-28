/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faDownload, faSignIn, faSignOut, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";
// components

import IndexDropdown from "components/Dropdowns/IndexDropdown.js";

export default function Navbar(props) {
  const history = useHistory();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [customerEmail, getCustomeremail] = useState();

  useEffect(() => {
    getCustomeremail(localStorage.getItem('customer'));
  }, [])

  const logout = () => {
    localStorage.clear();
    console.log("clicked")
    window.location.href = '/auth/login';
  }

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              onClick={() => {window.location.href='/'}}
              className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              Book Tour
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">

              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/books"
                >
                  Books
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/#service"
                >
                  Our Service
                </a>
              </li>


              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/#about"
                >
                  About US
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-red-700 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/#contact"
                >
                  Contact US
                </a>
              </li>


              {/* <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F"
                  target="_blank"
                >
                  <i className="text-blueGray-400 fab fa-facebook text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Share</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20React%20UI%20Kit%20and%20Admin.%20Let%20Notus%20React%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level.%20"
                  target="_blank"
                >
                  <i className="text-blueGray-400 fab fa-twitter text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Tweet</span>
                </a>
              </li> */}




              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/cart"
                >
                  <FontAwesomeIcon icon={faCartPlus} size='2x' />
                  <span className="lg:hidden inline-block ml-2">Cart</span>
                </a>
              </li>

              
              {customerEmail ?

                <>
                  <li className="flex items-center">
                    <a
                      className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                      onClick={() => { logout() }}
                      title="Sign OUT"
                    >
                      <FontAwesomeIcon icon={faSignOut} size='2x' />
                      <span className="lg:hidden inline-block ml-2">LogOut</span>
                    </a>
                  </li>
                  <li className="flex items-center">
                    <IndexDropdown />
                  </li>
                </>
                :
                <>
                  <li className="flex items-center">
                    <a
                      className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                      href="/auth/login"
                      title="Sign IN"
                    >
                      <FontAwesomeIcon icon={faSignIn} size='2x' />
                      <span className="lg:hidden inline-block ml-2">Login</span>
                    </a>
                  </li>

                  <li className="flex items-center">
                    <a
                      className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                      href="/auth/register"
                      title="Create Account"
                    >
                      <FontAwesomeIcon icon={faUserPlus} size='2x' />
                      <span className="lg:hidden inline-block ml-2">Create Account</span>
                    </a>
                  </li>
                </>
              }
              <li className="flex items-center">
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => { history.push('/downloads') }}
                >
                  <FontAwesomeIcon icon={faDownload} size='lg' style={{ marginRight: '5px' }} /> Downloads
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
