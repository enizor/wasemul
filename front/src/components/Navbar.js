import React from 'react';
import Auth from './AuthService';

import '../css/Navbar.css';

function Navbar() {
  // Loosely based on https://codepen.io/jo_Geek/pen/xgbaEr for HTML and CSS code
  return (
    <div className="nav">
      <div className="nav-header">
        <div className="nav-title">
          Wasemul
        </div>
      </div>
      <input type="checkbox" id="nav-check" />
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/users/1">First user</a>
        {!Auth.loggedIn() ? (
          <>
            <a href="/auth">Log in</a>
            <a href="/register">Sign up</a>
          </>
        ) : (
          <a href="/"> Logged in</a>
        )}
      </div>
    </div>
  );
}

export default Navbar;
