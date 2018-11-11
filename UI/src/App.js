import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './resources/App.css';
import Navbar from './components/NavigationBar/NavigationBar';
import Footer from './components/Footer/Footer';
import Router from './Router';

const Navigation = (props) =>
  <Navbar>
    <NavLink to="/"/>
    <NavLink to="/Home"/>
  </Navbar>

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Router />
        <Footer />
      </div>
    );
  }
}

export default App;
