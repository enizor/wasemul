import { Navbar, Nav, NavItem } from 'react-bootstrap';
import React from 'react';
import Auth from './AuthService';
import SearchBar from './SearchBar';

const NavigationBar = () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Wasemul</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/games">
          Games
        </NavItem>
        <NavItem eventKey={2} href="/users/3">
          AdminUser
        </NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem>
          <SearchBar />
        </NavItem>
        {!Auth.loggedIn() ? (
          <>
            <NavItem href="/auth">
              Log in
            </NavItem>
            <NavItem href="/register">
              Sign up
            </NavItem>
          </>
        ) : (
          <NavItem>
            <button
              type="button"
              className="pure-button pure-button-primary"
              onClick={() => { window.location.reload(); Auth.logout(); }}
            >
              Log out
            </button>
          </NavItem>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavigationBar;
