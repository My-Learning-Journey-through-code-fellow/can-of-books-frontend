import axios from 'axios';
import React from 'react';
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
// import App from './App';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  getBooks = async () => {
    try {
      let bookData = await axios.get(`${process.env.REACT_APP_SERVER_URL}/books`)
      this.setState({
        books: bookData.data,
      })
      console.log('hello');
    } catch (error) {
      console.log('We have an error.', error.response);
    }
  }
//--------------- form submission-----------------------
handleBookSubmit = (e) => {
  e.preventDefault();
  let newBook = {
    title: e.target.color.value,
    location: e.target.location.value,
    description: e.target.description.value,
    // name: event.target.name.value,
    // spayNeuter: event.target.spayNeuter.checked,
  }
  console.log(newBook);
  this.postBooks(newBook);
}

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

deleteBooks = async (id) => {
  try {
    let url = `${process.env.REACT_APP_SERVER_URL}/books/${id}`;
    await axios.delete(url);

    let updatedBooks = this.state.books.filter(book => book._id !== id);
    this.setState({
      books: updatedBooks
    })
  } catch (error) {
    console.log(error.message);
  }
}
//------------------------------------------------------


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

      </Container>

      <Container fluid id="bestBooksContainer">
        {this.state.book.length > 0 ? 
        
        <Carousel loop={true} rows={1} cols={3} id="carousel">
          {this.state.books.map((books, index) => (
            <Carousel.Item key={index}  className="bookCarousel">
                <Card className='bookCard'>
                  <Card.Body>
                    <Card.Title className="bookTitle">
                      {" "}
                      Title: {books.title}{" "}
                    </Card.Title>
                    <Card.Text className="bookDescription">
                      Description: {books.overview}
                    </Card.Text>
                    <Card.Img
                      src={`https://placekitten.com/g/200/200`}
                      alt={books.title}
                      rounded="true"
                      id="cardImg"
                      />
                    <Card.Text className="bookText">
                      {/* Votes: {movie.vote_average} Vote Count: {movie.vote_count}{" "}
                      Popularity: {movie.popularity}{" "} */}
                    </Card.Text>
                    <Card.Text className="bookText">
                      Release Date: {books.released_on}
                    </Card.Text>
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
