import {Button, Modal} from 'react-bootstrap'

function ModalComponent(props) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={ props.hideClose ? false : true}>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p> */}
        {props.children}
      </Modal.Body>
      <Modal.Footer>
       {!props.hideClose && <Button onClick={props.onHide}>Close</Button>}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent



