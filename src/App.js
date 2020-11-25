import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import "semantic-ui-css/semantic.min.css";
import CustomLayout from "./containers/Layout";
import "antd/dist/antd.css";
import "./App.css";

class App extends Component {

  render() {
    return (
      <Router>
        <CustomLayout>
          <BaseRouter />
        </CustomLayout>
      </Router>
    );
  }
}

export default App;
