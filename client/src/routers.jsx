import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Users } from "./components/Users/Users";
import { Authorization } from "./components/Authorization/Authorization";
import { SignIn } from "./components/Authorization/SignIn/SignIn";
import { SignUp } from "./components/Authorization/SignUp/SignUp";

export const useRoutes = (isAuthorized) => {
  if (isAuthorized) {
    return (
      <Switch>
        <Route path="/users">
          <Users></Users>
        </Route>
        <Redirect to="/users"></Redirect>
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <Authorization></Authorization>
      </Route>
      <Route path="/sign_in" exact>
        <SignIn></SignIn>
      </Route>
      <Route path="/sign_up" exact>
        <SignUp></SignUp>
      </Route>
      <Redirect to="/"></Redirect>
    </Switch>
  );
};
