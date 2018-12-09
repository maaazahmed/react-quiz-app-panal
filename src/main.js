import React, { Component } from 'react';
import './App.css';
import {
  Route, Router
} from "react-router-dom"
import history from "./History"
import {
  SignUp,
  LogIn,
  Dashboard
} from "./Components/index";



class MainComponet extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history} >
          <div>
            <Route exact path="/" component={SignUp} />
            <Route path="/LogIn" component={LogIn} />
            <Route path="/Dashboard" component={Dashboard} />
          </div>
        </Router>
      </div>
    );
  }
}

export default MainComponet;
