import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { UsuarioProvider, useUsuario } from "./context/usuarioContext";
ReactDOM.render(
  <UsuarioProvider>
    <App />
  </UsuarioProvider>,
  document.getElementById("root")
);
