import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Products from "../pages/Products";
import NewProduct from "../pages/NewProduct";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Products} />
      <Route exact path="/create" component={NewProduct} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
