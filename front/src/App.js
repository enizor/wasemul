import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/users/:id" component={User} />
          {/* default route */}
          <Route component={Home} />
        </Switch>
      </div>
    </Router>
  );
}
