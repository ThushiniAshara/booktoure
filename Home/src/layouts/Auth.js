import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import { useEffect, useState } from "react";
import Axios from 'axios';

export default function Auth() {

  const [header, setHeader] = useState([]);

  useEffect(() => {
    getHeader();
  })

  const getHeader = () => {
    Axios.get('http://localhost:3001/settings/viewHeader').then((respons) => {
      setHeader(respons.data);
    })
  }

  return (
    <>
      <main>
        {header.map((val, key) => {

          const ImageURL = 'http://localhost:3001/settings/'+ val.loginImage;
          return (
          <section className="relative w-full h-full py-40 min-h-screen">
            <div
              className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
              style={{
                // backgroundColor: 'gray'
                backgroundImage: `url("${ImageURL}")`,
              }}
            ></div>
            <Switch>
              <Route path="/auth/login" exact component={Login} />
              <Route path="/auth/register" exact component={Register} />
              <Redirect from="/auth" to="/auth/login" />
            </Switch>
            <FooterSmall absolute />
          </section>
        )}
        )}
      </main>
    </>
  );
}
