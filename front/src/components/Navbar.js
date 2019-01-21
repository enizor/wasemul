import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

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
        <SearchBar />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavigationBar;
