import React from 'react';
import { Route } from 'react-router-dom';
import BooksSearch from './BooksSearch';
import BooksList from './BooksList';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
      books: []
  };

  //Data update from BooksApi
  componentDidMount() {
    this.updateData()
  }

  //Shelf state auto-updater
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.updateData()
    })
  }

  updateData = () => {
    BooksAPI.getAll().then(data => {
            this.setState({
              books: data
            })
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <BooksList currentBooks={this.state.books} />} />
        <Route
          path="/search"
          render={() =>
          <BooksSearch updateShelf={this.updateShelf} currentBooks={this.state.books} />}/>
      </div>
    );
  }
}

export default BooksApp
