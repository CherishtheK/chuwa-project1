import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/index.js";
import "./index.css";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
          colorPrimary: "#5048e5",
          colorLink: "#5048e5",
        },
        components: {
          Form: {
            labelColor: "#6B7280",
            labelFontSize: 16,
          },
        },
      }}
    >
      <Provider store={store}>
        <BrowserRouter>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </StrictMode>,
);
