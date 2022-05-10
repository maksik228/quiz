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
import {Game} from "./components/Game";
import {GameResult} from "./components/GameResult";
import { Provider } from 'react-redux'
import store from "./store/store";



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="theme"  element={<Theme />} />
              <Route path="login"  element={<Login />} />
              <Route path="signup"  element={<Signup />} />
              <Route path="game/:id"  element={<Game />} />
              <Route path="game/result"  element={<GameResult />} />
          </Routes>
      </BrowserRouter>
    </Provider>
);

reportWebVitals();
