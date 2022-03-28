import { useState, useEffect } from "react";
import { Modal, ProgressBar } from "react-bootstrap";
import { JOIN_STATUS_MAKING_CONNECTION, JOIN_STATUS_GENERATING_TRANSACTION, JOIN_STATUS_WAITING_FOR_MINT, JOIN_STATUS_REDIRECTING } from "../constants";

const JoiningCallModal = (props) => {
  const [percent, setPercent] = useState(0);

  const getStatusText = () => {
    switch(props.status) {
      case JOIN_STATUS_MAKING_CONNECTION:
        return "Making Connection...";
      case JOIN_STATUS_GENERATING_TRANSACTION:
        return "Generating Transaction...";
      case JOIN_STATUS_WAITING_FOR_MINT:
        return "Waiting for Blockchain Confirmation...";
      case JOIN_STATUS_REDIRECTING:
        return "Successful, redirecting now...";
      default:
        return "";
    }
  }
  useEffect(() => {
    setInterval(() => {
      setPercent((old) => old + 0.5);
    }, 1000);
  }, [])

  useEffect(() => {
    switch(props.status) {
      case JOIN_STATUS_MAKING_CONNECTION:
          setPercent(10);
          break;
      case JOIN_STATUS_GENERATING_TRANSACTION:
        setPercent(15);
        break;
      case JOIN_STATUS_WAITING_FOR_MINT:
        setPercent(20);
        break;
      case JOIN_STATUS_REDIRECTING:
        setPercent(100);
        break;
      default:
        setPercent(0);
        break;
    }
  }, [props.status])
  
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Joining Call...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{getStatusText()}</h4>
        <ProgressBar striped variant="primary" now={percent} animated style={{ height: "0.75rem" }} />
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
}

export default JoiningCallModal;