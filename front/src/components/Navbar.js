import {
  Navbar, Nav,
} from 'react-bootstrap';
import React from 'react';
import Auth from './AuthService';
import SearchBar from './SearchBar';

const NavigationBar = () => (
  // The navigation bar of the app
  <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
    <Navbar.Brand href="/">Wasemul</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link eventKey={1} href="/games">
          Games
        </Nav.Link>
        { Auth.loggedIn() ? (
          <Nav.Link eventKey={2} href={`/users/${Auth.getProfile().id}`}>
            My Profile
          </Nav.Link>
        ) : null
        }
      </Nav>
      <SearchBar />
      <Nav className="ml-auto">
        {!Auth.loggedIn() ? (
          <>
            <Nav.Link href="/auth">
              Log in
            </Nav.Link>
            <Nav.Link href="/register">
              Sign up
            </Nav.Link>
          </>
        ) : (
          <Nav.Link
            style={{ color: 'red' }}
            onClick={() => { window.location.reload(); Auth.logout(); }}
          >
            Log Out
          </Nav.Link>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavigationBar;
