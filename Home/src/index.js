import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import './app.css';

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import Category from "views/Category.js";
import Cart from "views/Cart.js";
import Downloads from "views/Downloads";
import Books from "views/Books.js";
import Payment from "views/Payment";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/landing" exact component={Index} />
      <Route path="/category/:cat_id" exact component={Category} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact component={Landing} />
      <Route path="/books" exact component={Books} />
      <Route path="/payment" exact component={Payment} />
      <Route path="/downloads" exact component={Downloads} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
