import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import AppRoutes from "./router/router";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div id="app" className="bg-body">
        <AppRoutes />
      </div>
    </Provider>
  );
}

export default App;
