import React, { useRef, useEffect, useState } from 'react'
import { Modal, Button, InputGroup, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CALL_URL_PREPEND_TEXT } from '../constants';

const JoinCallModal = (props) => {
  const inputRef = useRef(null);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let callURL = inputRef.current.value; 
    if(callURL.length === 11) {
      callURL = `${CALL_URL_PREPEND_TEXT}-${callURL}`;
      navigate(`/call/${callURL}`);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>

          <Modal.Title id="contained-modal-title-vcenter" className='pl-2'>
            Join Call
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <InputGroup className="mb-3">
            <InputGroup.Text style={{ paddingRight: "0px" }}>${CALL_URL_PREPEND_TEXT}-</InputGroup.Text>
            <input ref={inputRef} type="text" className='form-control' aria-label="First name" autoFocus />
            <Form.Control.Feedback type="invalid">
              Please provide a valid ID.
            </Form.Control.Feedback>
          </InputGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Join</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default JoinCallModal;
