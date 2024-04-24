import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { App } from "./App";
import { store } from "./store/store";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ConfigProvider theme={{ hashed: false }}>
      <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
