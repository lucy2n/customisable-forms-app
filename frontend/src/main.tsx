
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import App from "./app/app";
import "./index.css";
import { HashRouter as Router } from 'react-router-dom';
import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { store } from "./app/appStore";


ReactDOM.createRoot((document.getElementById("root")) as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="light">
            <App />
          </NextThemesProvider>
        </NextUIProvider>
        </Router>
    </Provider>
  </React.StrictMode>
);