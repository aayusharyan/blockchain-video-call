import { Modal, ProgressBar } from "react-bootstrap";
import { JOIN_STATUS_MAKING_CONNECTION, JOIN_STATUS_GENERATING_TRANSACTION, JOIN_STATUS_WAITING_FOR_MINT, JOIN_STATUS_REDIRECTING } from "../constants";

const JoiningCallModal = (props) => {
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

  const getPercent = () => {
    switch(props.status) {
      case JOIN_STATUS_MAKING_CONNECTION:
        return 10;
      case JOIN_STATUS_GENERATING_TRANSACTION:
        return 20;
      case JOIN_STATUS_WAITING_FOR_MINT:
        return 45;
      case JOIN_STATUS_REDIRECTING:
        return 100;
      default:
        return 0;
    }
  }
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
        <ProgressBar striped variant="primary" now={getPercent()} animated style={{ height: "0.75rem" }} />
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
}

export default JoiningCallModal;