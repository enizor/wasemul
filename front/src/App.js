import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import EditUser from './components/EditUser';
import User from './components/User';
import EditGame from './components/EditGame';
import Game from './components/Game';
import Games from './components/Games';
import Navbar from './components/Navbar';
import SearchPage from './components/SearchPage';
import AuthForm from './components/AuthForm';
import SignUpForm from './components/SignUpForm';

import './App.css';

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/users/:id/edit" component={EditUser} />
          <Route path="/users/:id" component={User} />
          <Route path="/games/:id/edit" component={EditGame} />
          <Route path="/games/:id" component={Game} />
          <Route path="/games" component={Games} />
          <Route path="/search/:query" component={SearchPage} />
          <Route path="/auth" component={AuthForm} />
          <Route path="/register" component={SignUpForm} />
          {/* default route */}
          <Route component={Home} />
        </Switch>
      </div>
    </Router>
  );
}
