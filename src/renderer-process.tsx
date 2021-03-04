import "./styles/main.css";
import React from 'react'
import * as DOM from "react-dom";
import App from "./app";




DOM.render(<App/>, document.getElementById("root"));

if(module.hot) {
    module.hot.accept(e => console.error(e));
}