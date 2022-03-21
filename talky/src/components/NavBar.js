import React from 'react';
import 'bootswatch/dist/morph/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid className='ms-4 p-3'>
        <Link to="/" style={{textDecoration: "none"}}>
        <Navbar.Brand>
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          <h3 style={{ display: "inline" }}>
            <strong>Decentralized Peer-to-Peer Video Calling App</strong>
          </h3>
        </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  )
}

export default NavBar;