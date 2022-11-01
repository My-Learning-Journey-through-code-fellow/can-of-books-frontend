import React from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap";
// import Container from "react-bootstrap";
import { Form } from "react-bootstrap";
import { render } from "@testing-library/react";


class BookFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // books: []
    }
  }
  handleClose = () => {
    this.setState({
      setShow: false
    })
  }
  
  handleShow = () => {
    this.setState({
      setShow: true,
    })
  }
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  render() {
  return (
    <>
      <Button variant="primary" onClick={this.handleShow}>
        Add Books
      </Button>

      <Modal show={this.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your book here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Add book title here"
                autoFocus
                />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Add description here</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="status"
                placeholder="Available?"
                autoFocus
                />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleBookSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
}

render(<BookFormModal />);
