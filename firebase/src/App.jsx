import React from "react";
import Body from "./Component/Body";
import store from "./Utils/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Body />
      </Provider>
    </>
  );
};

export default App;
