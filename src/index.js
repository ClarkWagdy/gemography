import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App/App';
ReactDOM.render(
    < BrowserRouter >
    <App/>
    </ BrowserRouter >,
    document.querySelector('#root')
);

