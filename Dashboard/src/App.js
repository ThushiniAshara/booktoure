import "antd/dist/antd.css";
import { Redirect, Route, Switch } from "react-router-dom";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Main from "./components/layout/Main";
import Author from "./pages/Author";
import AuthorIncome from "./pages/AuthorIncome";
import Book from "./pages/Book";
import Category from "./pages/Category";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import Income from "./pages/Income";
import ISBN from "./pages/ISBN";
import Payments from "./pages/Payments";
import Profile from "./pages/Profile";
import Settings from "./pages/Setting";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route exact path="/tutorial" component={ISBN} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/customer" component={Customer} />
          <Route exact path="/book" component={Book} />
          <Route exact path="/authorIncome" component={AuthorIncome} />
          <Route exact path="/payments" component={Payments} />
          <Route exact path="/category" component={Category} />
          <Route exact path="/author" component={Author} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/income" component={Income} />
          <Route exact path="/contact" component={Contact} />
          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
