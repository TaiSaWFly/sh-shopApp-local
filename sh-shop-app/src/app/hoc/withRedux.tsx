import React, { ComponentType } from "react";
import { Provider } from "react-redux";
import store from "../store/createStore";

const withRedux =
  (Component: ComponentType): React.FC =>
  ({ ...props }) => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };

export default withRedux;
