import React from 'react';
import { Container } from 'react-bootstrap';

const MainContainer = (props) => {
  return (
    <Container fluid>
      {props.children}
    </Container>
  )
}

export default MainContainer