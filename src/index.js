import React from "react";
import ReactDOM from "react-dom";
import LandingPage from "./components/LandingPage";
import {store} from './redux/store';
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <LandingPage />
  </Provider>
, document.getElementById("root"));
