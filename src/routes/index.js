import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Products from "../pages/Products";
import NewProduct from "../pages/NewProduct";
import EditProduct from "../pages/EditProduct";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Products} />
      <Route exact path="/create" component={NewProduct} />
      <Route exact path="/edit/:id" component={EditProduct} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
