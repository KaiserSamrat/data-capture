import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";

const AdminRoute = ({ children, ...rest }) => {
  const { token, email, userrole } = useSelector((state) => ({
    ...state.Login,
  }));

  return token && userrole === "ADMIN" ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
