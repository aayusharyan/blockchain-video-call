import React from 'react';
import 'bootswatch/dist/morph/bootstrap.min.css';
import { Navbar, Container, Button, Stack } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid className='mx-4'>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{marginTop: "3px"}}
            />{' '}
            <h3 style={{ display: "inline" }}>
              <strong>Talkie</strong>
            </h3>
          </Navbar.Brand>
        </Link>
        <Stack direction='horizontal' gap={3}>
          <Button variant='outline-warning' >External Connection</Button>
        </Stack>
      </Container>
    </Navbar>
  )
}

export default NavBar;