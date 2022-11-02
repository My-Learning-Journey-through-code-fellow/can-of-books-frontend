import React from "react";
import { Container, Form, Button } from 'react-bootstrap';

class UpdateBookForm extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault();

    let boookToUpdate = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked,
      _id: this.props.book._id,
      // __v: this.props.book.__v
    }
    // console.log('UPDATED', boookToUpdate);

    this.props.updateBooks(boookToUpdate);
  }

  render(){
    return(
      <>
      <Container>
      <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                defaultValue={this.props.book.title}
                autoFocus
                />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="description">
              <Form.Label>Add description here</Form.Label>
              <Form.Control as="textarea"  defaultValue={this.props.book.description} 
              rows={3} type='description'/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
        <Form.Check type="checkbox" defaultChecked={this.props.book.status} label="Available" />
      </Form.Group>
          <Button variant="primary" type="submit">
          Save Changes
        </Button>
          </Form>
                </Container>
      </>
    )
  }
}

export default UpdateBookForm;
