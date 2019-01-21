import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import User from './components/User';
import Game from './components/Game';
import Games from './components/Games';
import Navbar from './components/Navbar';
import SearchPage from './components/SearchPage';
import './App.css';

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/users/:id" component={User} />
          <Route path="/games/:id" component={Game} />
          <Route path="/games" component={Games} />
          <Route path="/search/:query" component={SearchPage} />
          {/* default route */}
          <Route component={Home} />
        </Switch>
      </div>
    </Router>
  );
}
