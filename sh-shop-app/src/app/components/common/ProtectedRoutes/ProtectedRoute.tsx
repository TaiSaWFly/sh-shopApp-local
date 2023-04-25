import React, { ReactNode, ElementType } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getIsLoggedInStatus } from "../../../store/slices/user";

interface ProtectedRouteProps {
  component: ElementType;
  children?: ReactNode;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  children,
  path,
  ...rest
}) => {
  const isLoggedIn = useSelector(getIsLoggedInStatus());

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
          return (
            <Redirect
              to={{
                pathname: "/auth/signin",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

export default ProtectedRoute;
