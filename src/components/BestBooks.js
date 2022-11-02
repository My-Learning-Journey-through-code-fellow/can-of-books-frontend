import axios from 'axios';
import React from 'react';
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
// import { Modal } from 'react-bootstrap';
import BookFormModal from './BookFormModal.js';
import { Button } from 'react-bootstrap';
// import App from './App';
import UpdateBookForm from './UpdateBookForm.js';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      booktoUpdate: {},
    }
  }

  getBooks = async () => {
    try {
      let bookData = await axios.get(`${process.env.REACT_APP_SERVER_URL}/books`)
      this.setState({
        books: bookData.data,
      })
      console.log(this.state.books);
    } catch (error) {
      console.log('We have an error.', error.response);
    }
  }
  //--------------- form submission-----------------------
  // handleBookSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(e.target.description.value)
  //   console.log(e.target.title.value)
  //   const newBook = {
  //     title: e.target.title.value,
  //     // location: e.target.location.value,
  //     description: e.target.description.value,
  //     status: e.target.status.checked
  //     // name: event.target.name.value,
  //     // spayNeuter: event.target.spayNeuter.checked,
  //   }
  //   console.log(newBook);
  //   this.postBooks(newBook);
  // }

  postBooks = async (newBookObj) => {
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/books`;
      let createdBook = await axios.post(url, newBookObj);
      this.setState({
        books: [...this.state.books, createdBook.data]
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  deleteBooks = async (bookToBeDeleted) => {
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/books/${bookToBeDeleted._id}`;
      await axios.delete(url);

      let updatedBooks = this.state.books.filter(book => book._id !== bookToBeDeleted._id);
      this.setState({
        books: updatedBooks
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  //------------------------------------------------------
  updatedBooks = async (bookToUpdate) => {
    console.log(bookToUpdate);
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/books/${bookToUpdate._id}`
      let updatedBook = await axios.put(url, bookToUpdate);

      let updatedBookArray = this.state.books.map(existingBook => {

        return existingBook._id === bookToUpdate._id ? updatedBook.data : existingBook;
      });

      this.setState({
        books: updatedBookArray
      });

    } catch (error) {
      console.log(error.message)
    }
  }


  //---------------------------------

  componentDidMount() {
    this.getBooks();
    console.log('component mounted');
  }
  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  render() {

    console.log("App State >>>", this.state.books);
    /* TODO: render all the books in a Carousel */

    return (
      <>
        <Container>
          <BookFormModal
            deleteBooks={this.deleteBooks}
            postBooks={this.postBooks}
            books={this.state.books}
          />
        </Container>
        {
          this.state.showUpdateForm &&
          <Container>
            <UpdateBookForm
              updateBooks={this.updatedBooks}
              book={this.state.booktoUpdate}
            />
          </Container>
        }
        <Container fluid id="bestBooksContainer">
          {this.state.books.length > 0 ?

            <Carousel variant='dark' loop={true} rows={1} cols={3} id="carousel">
              {this.state.books.map((books, index) => (
                <Carousel.Item style={{ padding: 150 }} key={index} className="bookCarousel">
                  <Card className='bookCard'>
                    <Button variant="dark" style={{ width: 'max-content', margin: 'auto' }} onClick={() => { this.deleteBooks(books) }}>Delete</Button>

                    <Button variant="info" onClick={() => { this.setState({ showUpdateForm: true, booktoUpdate: books }) }}>Update</Button>

                    <Card.Body style={{ width: 'max-content', margin: 'auto' }}>
                      <Card.Title className="bookTitle">
                        {" "}
                        Title: {books.title}{" "}
                      </Card.Title>
                      <Card.Text className="bookDescription">
                        Description: {books.description}
                      </Card.Text>
                      <img
                        src={`https://placekitten.com/g/400/400`}
                        alt={books.title}
                        rounded="true"
                        id="cardImg"
                      />
                      <Card.Text className="bookText">
                      </Card.Text>
                      <Card.Text className="bookText">
                        Available: {books.status}
                      </Card.Text>
                      {/* <Button variant="dark" onClick={() => {this.deleteBooks(books)}}>Delete</Button> */}
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel>
            : <p>No books available</p>
          }
        </Container>
      </>
    )
  }
}

export default BestBooks;
