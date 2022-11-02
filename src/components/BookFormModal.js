import React from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap";
import { Form } from "react-bootstrap";
// import { render } from "@testing-library/react";



class BookFormModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      setShow: false,
      books: []
    }
  }

  handleBookSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target)
    console.log(e.target.title.value)
    const newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.checked
    }
    console.log(newBook);
    this.props.postBooks(newBook);
    this.setState({
      setShow: false
    })
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
        {/* <Button variant="dark" onClick={() => {this.props.deleteBooks(this.props.books)}}>Delete</Button> */}

        <Modal show={this.state.setShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add your book here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleBookSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Add book title here"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="description">
                <Form.Label>Add description here</Form.Label>
                <Form.Control as="textarea" rows={3} type='description' />
              </Form.Group>
              <Form.Group className="mb-3" controlId="status">
                <Form.Check type="checkbox" label="Available" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

// render(<BookFormModal />);
export default BookFormModal;
