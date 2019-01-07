import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import SearchBar from './SearchBar';

const NavigationBar = () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">React-Bootstrap</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/games">
          PokemonGreenGame
        </NavItem>
        <NavItem eventKey={2} href="/users/3">
          AdminUser
        </NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem>
          <SearchBar />
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavigationBar;
