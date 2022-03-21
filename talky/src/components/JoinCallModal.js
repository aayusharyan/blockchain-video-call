import React, { useRef, useEffect } from 'react'
import { Modal, Button, InputGroup } from 'react-bootstrap';

const JoinCallModal = (props) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [props])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className='pl-2'>
          Join Call
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ paddingRight: "0px" }}>dpva-</InputGroup.Text>
          <input ref={inputRef} type="text" className='form-control' aria-label="First name" autoFocus />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Join</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default JoinCallModal;
