import React, {Component} from 'react';
// SEMANTIC UI
import {Popup, Rating} from 'semantic-ui-react'


//CONSTANTS
const SHELF_CURRENTLY_READING = "currentlyReading";
const SHELF_READ = "read";
const SHELF_WANT_TO_READ = "wantToRead";

const SHELF_TITLE = {
    SHELF_CURRENTLY_READING: 'Currently Reading',
    SHELF_READ: 'Read',
    SHELF_WANT_TO_READ: 'Want To Read'
};

class BookCard extends Component {

    static defaultProps  = {
        shelfbooks: [],
        book: {},
        onChangeShelfBook: () => {
        }
    };

    render() {

        let book = this.props.book;

        const {onChangeShelfBook, shelfbooks} = this.props;

        if (shelfbooks) {
            const shelfBook = shelfbooks.filter(shelfBook => shelfBook.id === book.id);
            book = shelfBook[0] ? shelfBook[0] : book;
        }

        const date = new Date(book.publishedDate);

        const imagem = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAF3AQMAAAC2e8TMAAAABlBMVEXMzMyWlpYU2uzLAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVRoge3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAApwYwVwABN271wQAAAABJRU5ErkJggg==";

        return (

            <div className="book-wrapper" key={book.id}>
                <div className="book-card">
                    <div className="poster-wrapper">

                        <img className="poster"
                             src={imagem}
                             alt={book.title}
                             style={{opacity: 1}}/>
                        <div className="colored-shadow"
                             style={{backgroundImage: 'url(' + imagem + ')'}}/>
                        <h5 className="rating">
                            <Rating icon='star'
                                    disabled
                                    defaultRating={book.averageRating ? book.averageRating : 0}
                                    maxRating={5}/>
                        </h5>
                    </div>
                    <div className="info-wrapper">
                        <div className="title"><h4>{book.title}</h4></div>
                        <div className="genres">
                            {book.authors && (
                                <div>
                                    <div className="ui small label">
                                        <i className="user icon"/>
                                        {book.authors.map(author => author)}
                                    </div>
                                    < div className="ui small label">{date.getFullYear()}</div>
                                    <div className="ui small label">
                                        lang: {book.language}
                                    </div>
                                    <div className="ui small label">
                                        Pg: {book.pageCount}
                                    </div>
                                    {book.categories && book.categories.map((category, index) => (
                                        <div className="ui small label" key={index}>{category}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="want-to-read-wrapper">
                        <Popup
                            key={book.id}
                            trigger={
                                <a>
                                    <i className={"heart icon icon-want-to-read " + (book.shelf === SHELF_WANT_TO_READ ? "active" : "")}
                                       onClick={() => onChangeShelfBook(book, SHELF_WANT_TO_READ)}/>
                                </a>
                            }
                            content="Want to read"
                        />

                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div className="actions-bar">
                        <div className="ui buttons">
                            <button className={"ui button " + (book.shelf === SHELF_READ ? "disabled" : "")}
                                    onClick={() => onChangeShelfBook(book, SHELF_READ)}>{SHELF_TITLE.SHELF_READ}</button>
                            <div className="or"/>
                            <button
                                className={"ui positive button " + (book.shelf === SHELF_CURRENTLY_READING ? "disabled" : "")}
                                onClick={() => onChangeShelfBook(book, SHELF_CURRENTLY_READING)}>{SHELF_TITLE.SHELF_CURRENTLY_READING}</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default BookCard;
