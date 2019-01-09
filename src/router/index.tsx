import { Route, Switch } from 'react-router-dom';
import Girds from "../views/Girds";
import Todo from "../views/Todo";
import SignIn  from "../views/SignIn";
import Games from "../views/canvas/Index";

import * as React from "react";

export const Router = () => (
  <Switch>
    <Route path="/todo" component={Todo} />
    <Route path="/demo/girds" component={Girds} />
    <Route path="/signIn" component={SignIn} />
    <Route path="/games" component={Games} />
  </Switch>
);
