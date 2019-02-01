import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Exec from './Exec';
import FourZeroFour from './404';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/exec' component={Exec}/>
        <Route path='*' component={FourZeroFour}/>
      </Switch>
    )
  }
}

export default App;
