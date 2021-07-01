import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../Layouts/HomePage";
import SignUpExistingAccount from "../Layouts/SignUpExistingAccount";
import Register from "../Layouts/Register";
import Navbar from "../components/Navbar"
import PostPage from "../Layouts/PostPage";
const Routers = () => {

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/create-account" component={Register} />
        <Route path="/login" component={SignUpExistingAccount} />
        <PrivateRoute path="/post/:id" component={PostPage} />
      </Switch>
    </Router>
  );
};

export default Routers;
