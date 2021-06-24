import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import Home from'./Components/home/Home';
function App() {
  return (<React.Fragment>
  <Switch>
      <Route to="/" exact  component={Home}/>
  </Switch>
  </React.Fragment>);
}

export default App;
