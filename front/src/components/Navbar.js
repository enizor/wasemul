import React from 'react';

function Navbar() {
  // Lossely based on https://codepen.io/jo_Geek/pen/xgbaEr for HTML and CSS code
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
        <a href="/users/0">First user</a>
      </div>
    </div>
  );
}

export default Navbar;
