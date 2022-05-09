import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import {Theme} from "./components/Theme";
import {Login} from "./components/Login";
import {Signup} from "./components/Signup";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="theme"  element={<Theme />} />
              <Route path="login"  element={<Login />} />
              <Route path="signup"  element={<Signup />} />
          </Routes>
      </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
