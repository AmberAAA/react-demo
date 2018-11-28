import { Route } from 'react-router-dom';
import Girds from "../views/Girds";
import Todo from "../views/Todo";
import SignIn  from "../views/SignIn";

import * as React from "react";

export const Router = () => (
  <div className="router-contain">
    <Route path="/todo" component={Todo} />
    <Route path="/demo/girds" component={Girds} />
    <Route path="/signIn" component={SignIn} />
  </div>
);
