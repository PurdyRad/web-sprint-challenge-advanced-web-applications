import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import BubblePage from './components/BubblePage';
import ColorList from "./components/ColorList";
import Login from "./components/Login";

import PrivateRoute from './components/PrivateRoute';

import "./styles.scss";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/protected/bubblePage/colors/:id' component={ColorList} />
          <PrivateRoute exactpath ='/protected/bubblePage' component={BubblePage} />
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute