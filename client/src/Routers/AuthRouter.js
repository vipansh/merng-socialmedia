import React from "react";

import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthRouter = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Redirect to="/" />
        ) : (
          <RouteComponent {...props} />
        );
      }}
    ></Route>
  );
};

export default AuthRouter;
