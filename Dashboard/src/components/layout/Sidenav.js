// import { useState } from "react";
import {
  BookOutlined, ContactsOutlined, BorderInnerOutlined, DollarOutlined, DownloadOutlined, SettingOutlined, TeamOutlined, UserAddOutlined, UserOutlined
} from '@ant-design/icons';
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";


function Sidenav({ color }) {

  const [user, setUser] = useState();

  useEffect(() => {
    setUser(localStorage.getItem('author'))
  }, [])

  const { pathname } = useLocation();
  const page = pathname.replace("/", "");


  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Book Tour Dashboard</span>
      </div>
      <hr />
      {user === 'admin' ?
        <Menu theme="light" mode="inline">

          <Menu.Item key="1">
            <NavLink to="/dashboard">
              <span
                className="icon"
                style={{
                  background: page === "dashboard" ? color : "",
                }}
              >
                <TeamOutlined />
              </span>
              <span className="label">Dashboard</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/customer">
              <span
                className="icon"
                style={{
                  background: page === "customer" ? color : "",
                }}
              >
                <UserOutlined />
              </span>
              <span className="label">Customer</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/book">
              <span
                className="icon"
                style={{
                  background: page === "books" ? color : "",
                }}
              >
                <BookOutlined />
              </span>
              <span className="label">Books</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to="/income">
              <span
                className="icon"
                style={{
                  background: page === "income" ? color : "",
                }}
              >
                <DownloadOutlined />
              </span>
              <span className="label">Income</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="4">
            <NavLink to="/category">
              <span
                className="icon"
                style={{
                  background: page === "category" ? color : "",
                }}
              >
                <BorderInnerOutlined />
              </span>
              <span className="label">Category</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5">
            <NavLink to="/author">
              <span
                className="icon"
                style={{
                  background: page === "author" ? color : "",
                }}
              >
                <UserAddOutlined />
              </span>
              <span className="label">Author</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5">
            <NavLink to="/payments">
              <span
                className="icon"
                style={{
                  background: page === "payments" ? color : "",
                }}
              >
                <DollarOutlined />
              </span>
              <span className="label">Payments</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5">
            <NavLink to="/contact">
              <span
                className="icon"
                style={{
                  background: page === "contact" ? color : "",
                }}
              >
                <ContactsOutlined />
              </span>
              <span className="label">Contact</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item className="menu-item-header" key="5">
            Customization Pages
          </Menu.Item>
          <Menu.Item key="6">
            <NavLink to="/settings">
              <span
                className="icon"
                style={{
                  background: page === "profile" ? color : "",
                }}
              >
                <SettingOutlined />
              </span>
              <span className="label">Settings</span>
            </NavLink>
          </Menu.Item>
        </Menu>
        :

        <Menu theme="light" mode="inline">
          <Menu.Item key="1">
            <NavLink to="/dashboard">
              <span
                className="icon"
                style={{
                  background: page === "dashboard" ? color : "",
                }}
              >
                <TeamOutlined />
              </span>
              <span className="label">Dashboard</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/customer">
              <span
                className="icon"
                style={{
                  background: page === "customer" ? color : "",
                }}
              >
                <UserOutlined />
              </span>
              <span className="label">Customer</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to="/book">
              <span
                className="icon"
                style={{
                  background: page === "book" ? color : "",
                }}
              >
                <BookOutlined />
              </span>
              <span className="label">Books</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="4">
            <NavLink to="/authorIncome">
              <span
                className="icon"
                style={{
                  background: page === "authorIncome" ? color : "",
                }}
              >
                <DownloadOutlined />
              </span>
              <span className="label">InCome</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5">
            <NavLink to="/payments">
              <span
                className="icon"
                style={{
                  background: page === "payments" ? color : "",
                }}
              >
                <DollarOutlined />
              </span>
              <span className="label">Payments</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item className="menu-item-header" key="5">
            Account Pages
          </Menu.Item>
          <Menu.Item key="6">
            <NavLink to="/profile">
              <span
                className="icon"
                style={{
                  background: page === "profile" ? color : "",
                }}
              >
                <TeamOutlined />
              </span>
              <span className="label">Profile</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="1">
            <NavLink to="/tutorial">
              <span
                className="icon"
                style={{
                  background: page === "tutorial" ? color : "",
                }}
              >
                <TeamOutlined />
              </span>
              <span className="label">Tutorial</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      }
    </>
  );
}

export default Sidenav;
