import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AuthMiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  roles,
  ...rest
}) => {
  const { token, userrole } = useSelector((state) => ({
    ...state.Login,
  }));

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthProtected && token && roles?.includes(userrole)) {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default AuthMiddleware;
