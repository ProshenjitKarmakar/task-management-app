import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import store from "./state/store";
import {BrowserRouter} from "react-router-dom";
import {Toaster} from "react-hot-toast";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
            <Toaster position='top-right'/>
        </Provider>
    </BrowserRouter>
);
