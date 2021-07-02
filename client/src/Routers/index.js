import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../Layouts/HomePage";
import SignUpExistingAccount from "../Layouts/SignUpExistingAccount";
import Register from "../Layouts/Register";
import Navbar from "../components/Navbar"
import PostPage from "../Layouts/PostPage";
import AuthRouter from "./AuthRouter";
const Routers = () => {

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <AuthRouter path="/create-account" component={Register} />
        <AuthRouter path="/login" component={SignUpExistingAccount} />
        <Route path="/post/:id" component={PostPage} />
      </Switch>
    </Router>
  );
};

export default Routers;
