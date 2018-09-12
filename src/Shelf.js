import React, {Component} from 'react';


// SEMANTIC UI
import {Rating} from 'semantic-ui-react'


//CONSTANTS
const SHELF_CURRENTLY_READING = "currentlyReading";
const SHELF_READ = "read";
const SHELF_WANT_TO_READ = "wantToRead";

class Shelf extends Component {

    render() {

        const {books, loading, shelf, shelfTitle, onChangeShelfBook} = this.props;

        return (
            <React.Fragment >

                {loading && (
                    <React.Fragment>
                        <div className="book-wrapper loading blink">
                            <div className="book-card">
                                <div className="poster-wrapper">
                                    <img className="poster"
                                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAF3AQMAAAC2e8TMAAAABlBMVEXMzMyWlpYU2uzLAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVRoge3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAApwYwVwABN271wQAAAABJRU5ErkJggg=="
                                         alt="placeholder"/>
                                </div>
                                <div className="info-wrapper">
                                    <div className="loading-block"/>
                                    <div className="loading-block small"/>
                                </div>
                                <div className="actions-bar">

                                    <div className="ui rating" data-rating="3" data-max-rating="5"/>
                                </div>
                            </div>
                        </div>
                        <div className="book-wrapper loading blink">
                            <div className="book-card">
                                <div className="poster-wrapper">
                                    <img className="poster"
                                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAF3AQMAAAC2e8TMAAAABlBMVEXMzMyWlpYU2uzLAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVRoge3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAApwYwVwABN271wQAAAABJRU5ErkJggg=="
                                         alt="placeholder"/>
                                </div>
                                <div className="info-wrapper">
                                    <div className="loading-block"/>
                                    <div className="loading-block small"/>
                                </div>
                                <div className="actions-bar">

                                    <div className="ui rating" data-rating="3" data-max-rating="5"/>
                                </div>
                            </div>
                        </div>
                        <div className="book-wrapper loading blink">
                            <div className="book-card">
                                <div className="poster-wrapper">
                                    <img className="poster"
                                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAF3AQMAAAC2e8TMAAAABlBMVEXMzMyWlpYU2uzLAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVRoge3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAApwYwVwABN271wQAAAABJRU5ErkJggg=="
                                         alt="placeholder"/>
                                </div>
                                <div className="info-wrapper">
                                    <div className="loading-block"/>
                                    <div className="loading-block small"/>
                                </div>
                                <div className="actions-bar">

                                    <div className="ui rating" data-rating="3" data-max-rating="5"/>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}

                {!loading && (books.filter((book) => book.shelf === shelf).map((book) => (

                    <div className="book-wrapper" key={book.id}>
                        <div className="book-card">
                            <div className="poster-wrapper">
                                <img className="poster"
                                     src={book.imageLinks.thumbnail}
                                     alt={book.title}
                                     style={{opacity: 1}}/>
                                <div className="colored-shadow"
                                     style={{backgroundImage: 'url(https://image.tmdb.org/t/p/w500/ooBGRQBdbGzBxAVfExiO8r7kloA.jpg)'}}/>
                                <h5 className="rating">
                                    <Rating defaultRating={book.averageRating ? book.averageRating : 0}
                                            maxRating={5}/>
                                </h5>
                            </div>
                            <div className="info-wrapper">
                                <div className="title"><h4>{book.title}</h4></div>
                                <div className="genres">
                                    <div className="ui tiny label">
                                        <i className="edit circle icon"/>
                                        {book.authors.map(author => author)}
                                    </div>
                                    <div className="ui tiny label">{book.publishedDate}</div>
                                    <div className="ui tiny label">{book.language}</div>
                                    {book.categories && book.categories.map((category, index) => (
                                        <div className="ui tiny label" key={index}>{category}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="want-to-read-wrapper">
                                <i className={"heart icon " + (book.shelf === SHELF_WANT_TO_READ && "ui red")}
                                   onClick={() => onChangeShelfBook(book, SHELF_WANT_TO_READ)}/>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <div className="actions-bar">
                                <div className="ui buttons">
                                    <button className="ui button disabled">{shelfTitle.SHELF_READ}</button>
                                    <div className="or"/>
                                    <button
                                        className="ui positive button">{shelfTitle.SHELF_CURRENTLY_READING}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                )))}
            </React.Fragment>
        );
    }
}

export default Shelf;
