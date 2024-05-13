import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/Common.css';
import App from './App.tsx';
import * as serviceWorker from './serviceWorker.js';
import { Provider } from 'react-redux';
import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import store from './store/store.ts';

// todo change to ts
// todo work more with more newer router methods
ReactDOM.createRoot(document.getElementById("root")).render(
        <Provider store={store}>
            <BrowserRouter><App /></BrowserRouter>
        </Provider>

);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
