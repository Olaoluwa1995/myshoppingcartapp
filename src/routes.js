import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import ProductList from "./containers/ProductList";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={ProductList} />
  </Hoc>
);

export default BaseRouter;
