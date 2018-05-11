import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import Form from './components/Form';
import Navigator from './components/navigator';


class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }


    render() {
      return (
      <div className="App">

      <div className="App-header">
      <Navbar collapseOnSelect fluid>
      <Navbar.Toggle />
      <Navbar.Collapse>
       <img className="App-logo" src='movie.gif'/>
       <img className="App-logo" src='movie1.gif'/>
       <img className="App-logo" src='movie2.gif'/>
       <img className="App-logo" src='movie3.gif'/>
       <img className="App-logo" src='movie4.gif'/>
      </Navbar.Collapse>
      </Navbar>
      </div>
      <Navigator/>
      <div className="App-content">
        <Switch>
           <Route exact path='/' component={Form}/>
           
        </Switch> 

      </div>  
      </div>
      );
    }
  }

  export default App;
