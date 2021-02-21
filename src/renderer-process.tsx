import {hot} from "react-hot-loader/root";
import "./styles/main.css";
import React from 'react'
import * as DOM from "react-dom";
import App from "./app";



const HotApp = hot(() => <App/>);

DOM.render(<HotApp/>, document.getElementById("root"));
