import React, {Component} from 'react';
import './App.css';
import logo from './logo.png';

//API
import * as BooksAPI from './Api/BooksAPI'

const shelfCurrentlyReading = "currentlyReading";
const shelfRead = "read";
const shelfWantToRead = "wantToRead";
const shelfTitle = {
    shelfCurrentlyReading: 'Currently Reading',
    shelfRead: 'Read',
    shelfWantToRead: 'Want To Read'
}

class App extends Component {

    state = {
        books: [],
        loading: true
    };

    componentDidMount() {

        // this.setState({loading: true})

        BooksAPI.getAll().then((books) => {
            this.setState({books});
            // setTimeout(() => {this.setState({loading: false})}, 5000);
            this.setState({loading: false})
        })

    }

    render() {

        const {books, loading} = this.state;

        return (
            <div>
                <div className="app-container">
                    <div className="side-menu">
                        <div className="profile-section">
                            <a className="logo-wrapper" href="/discover">
                                <img src={logo} className="logo" alt="My Reads"/>
                                <h2>MY READS</h2>
                            </a>
                        </div>
                        <ul className="menu-list">
                            <a className="menu-item active" href="/discover">
                                <i className="address book icon"/>
                                Reading
                            </a>
                            <a className="menu-item" href="/reviews">
                                <i className="heart icon"/>
                                Wishes
                            </a>
                            <a className="menu-item" href="/activity">
                                <i className="archive icon"/>
                                Read
                            </a>
                        </ul>
                    </div>
                    <div className="feed-container">
                        <div>
                            <div className="filter-row">
                                <div className="ui search">
                                    <div className="ui icon input">
                                        <input placeholder="Search" type="text" tabIndex="0" className="prompt"
                                               autoComplete="off"/>
                                        <i aria-hidden="true" className="search icon"/>
                                    </div>
                                </div>
                                <div role="listbox" aria-expanded="false"
                                     className="ui inline top right pointing dropdown produ-dropdown" tabIndex="0">
                                    <div className="text" role="alert" aria-live="polite">All</div>
                                    <i aria-hidden="true" className="dropdown icon"/>
                                    <div className="menu transition">
                                        <div role="option" aria-checked="true" aria-selected="true"
                                             className="active selected item">
                                            <span className="text">All</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="books-container">

                                {books.filter((book) => book.shelf === shelfRead).map((book) => (

                                    <div className="book-wrapper">
                                        <div className="book-card">
                                            <div className="poster-wrapper">
                                                <img className="poster"
                                                     src={book.imageLinks.smallThumbnail}
                                                     alt={book.title}
                                                     style={{opacity: 1}}/>
                                                <div className="colored-shadow"
                                                     style={{backgroundImage: 'url(https://image.tmdb.org/t/p/w500/ooBGRQBdbGzBxAVfExiO8r7kloA.jpg)'}}/>
                                                <h5 className="score">{book.averageRating ? book.averageRating : 0}</h5>
                                            </div>
                                            <div className="info-wrapper">
                                                <div className="title"><h4>{book.title}</h4></div>
                                                <div className="genres">
                                                    <div className="ui tiny label">
                                                        <i className="user icon" />
                                                        {book.authors.map(author => author)}
                                                    </div>
                                                    <div className="ui tiny label">{book.publishedDate}</div>
                                                    <div className="ui tiny label">{book.language}</div>
                                                    {book.categories.map(category => (
                                                        <div className="ui tiny label">{category}</div>
                                                    ))}
                                                </div>
                                            </div>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <div className="actions-bar">

                                            </div>
                                        </div>
                                    </div>
                                ))}

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

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
