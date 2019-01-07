import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import User from './components/User';
import Game from './components/Game';
import Navbar from './components/Navbar';
import './App.css';
import AuthForm from './components/AuthForm';

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/users/:id" component={User} />
          <Route path="/games/:id" component={Game} />
          <Route path="/auth" component={AuthForm} />
          {/* default route */}
          <Route component={Home} />
        </Switch>
      </div>
    </Router>
  );
}
