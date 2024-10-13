
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from "./app/app";
import "./index.css";
import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { store } from "./app/appStore";


ReactDOM.createRoot((document.getElementById("root")) as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="light">
            <App />
          </NextThemesProvider>
        </NextUIProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);