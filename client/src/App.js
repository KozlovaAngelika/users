import React from "react";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRoutes } from "./routers";
import "./App.scss";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth.hook";

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthorized = !!token;
  const routes = useRoutes(isAuthorized);
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthorized,
      }}
    >
      <BrowserRouter>
        <div className="app"> {routes} </div>{" "}
      </BrowserRouter>{" "}
    </AuthContext.Provider>
  );
}

export default App;
