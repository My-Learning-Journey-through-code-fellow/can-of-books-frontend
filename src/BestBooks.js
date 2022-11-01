import axios from 'axios';
import React from 'react';
import App from './App';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  getBooks = async () => {
    try {
      let bookData = await axios.get(`${process.env.DB_URL}/books`)
      this.setState({
        books: bookData.data,
      })
    } catch (error) {
      console.log('We have an error.', error.response);
    }
  }
  componentDidMount() {
    this.getBooks();
  }
  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  render() {
    console.log("App State >>>", this.state);
    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <p>Book Carousel coming soon</p>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
