import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalFooter = (props) => (
    <Modal.Footer>
      <button type="button" className="btn btn-warning" onClick={props.action}>{props.submitText}</button>
      <button className="btn" onClick={props.hide}>Close</button>
    </Modal.Footer>
);

export default ModalFooter;