import React from "react";

import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useAuth();

  console.log("currentUser", currentUser);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <RouteComponent {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
