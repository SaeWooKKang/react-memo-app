import React from "react";
import ReactDOM from "react-dom";
import Container from "./component/Container";
import {store} from './redux/store';
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>
, document.getElementById("root"));
