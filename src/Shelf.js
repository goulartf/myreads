import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import BookCard from "./Book/BookCard";
import BookCardPlaceholder from "./Book/BookCardPlaceholder";

class Shelf extends Component {

    render() {

        const {books, loading, shelf, onChangeShelfBook} = this.props;

        const filterBooks = books.filter((book) => book.shelf === shelf);

        return (
            <React.Fragment>

                <div className="books-container">
                    {loading && (
                        <BookCardPlaceholder size={3} />
                    )}

                    {!loading && (filterBooks.map((book) => (

                        <BookCard book={book} shelfActive={shelf} onChangeShelfBook={onChangeShelfBook} key={book.id}/>

                    )))}

                    {!loading && (filterBooks.length === 0 && (

                        <div className="ui floating message">
                            <p>No Books Selected! Let`s try new one ou <Link  to="/search" >Search</Link></p>
                        </div>

                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default Shelf;
