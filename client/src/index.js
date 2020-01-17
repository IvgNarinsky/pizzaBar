import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom"
import thunk from "redux-thunk";
import App from './App'
import AuthR from "./Store/Reducer/auth"
import OrderR from "./Store/Reducer/order"
import StepsR from './Store/Reducer/steps'
import MenuR from './Store/Reducer/menu'
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'

const rootReducer = combineReducers({
 auth:AuthR,
 order:OrderR,
 steps:StepsR,
 menu:MenuR
});
const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));



const app = (<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>)
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();