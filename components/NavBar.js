/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar className="nav-bar" collapseOnSelect expand="lg" variant="dark">
      <Container className="nb-cont">
        <Link passHref href="/">
          <Navbar.Brand className="logo">Eth<span className="logo-o">o</span>s</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/circles/circles">
              <Nav.Link className="view-subheader nb-item">Circles</Nav.Link>
            </Link>
            <Link passHref href="/user">
              <Nav.Link className="view-subheader nb-item">My User</Nav.Link>
            </Link>
            <Link passHref href="/aboutme">
              <Nav.Link className="view-subheader nb-item">Who Made This?</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
