import React from "react";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useRoutes } from "./routers";
import "./App.scss";
function App() {
  const routes = useRoutes(false);
  return (
    <BrowserRouter>
      <div className="app">{routes}</div>
    </BrowserRouter>
  );
}

export default App;
