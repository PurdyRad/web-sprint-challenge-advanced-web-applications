import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import BubblePage from './components/BubblePage';
import ColorList from "./components/ColorList";
import EditMenu from "./components/EditMenu";
import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/protected/bubblePage/colors-edit/:id' component={EditMenu} />
          <Route path='/protected/bubblePage/colors/:id' component={ColorList} />
          <Route path ='/protected/bubblePage' component={BubblePage} />
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute