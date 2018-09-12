import React, {Component} from 'react';
import './App.css';
import logo from './logo.png';

//API
import * as BooksAPI from './Api/BooksAPI'

//COMPONENTS
import Shelf from "./Shelf";

//CONSTANTS
const SHELF_CURRENTLY_READING = "currentlyReading";
const SHELF_READ = "read";
const SHELF_WANT_TO_READ = "wantToRead";

const SHELF_TITLE = {
    SHELF_CURRENTLY_READING: 'Currently Reading',
    SHELF_READ: 'Read',
    SHELF_WANT_TO_READ: 'Want To Read'
};

class App extends Component {

    state = {
        books: [{},{},{}],
        loading: true
    };

    componentDidMount() {

        this.getAllBooks();

    }

    getAllBooks = () => {


        this.setState({loading: true})
        BooksAPI.getAll().then((books) => {

            setTimeout(() => {
                this.setState({loading: false})
                this.setState({books});
            }, 1000);

        })

    };

    changeShelfBook = (book, shelf) => {

        BooksAPI.update(book, shelf).then(() => {

            this.getAllBooks();

        });

    };

    render() {

        const {books, loading} = this.state;

        return (
            <div>
                <div className="app-container">
                    <div className="side-menu">
                        <div className="profile-section">
                            <a className="logo-wrapper" href="/">
                                <img src={logo} className="logo" alt="My Reads"/>
                                <h2>MY READS</h2>
                            </a>
                        </div>
                        <ul className="menu-list">
                            <a className="menu-item active" href="/">
                                <i className="eye icon"/>
                                {SHELF_TITLE.SHELF_CURRENTLY_READING}
                            </a>
                            <a className="menu-item" href="/">
                                <i className="heart icon"/>
                                {SHELF_TITLE.SHELF_WANT_TO_READ}
                            </a>
                            <a className="menu-item" href="/">
                                <i className="archive icon"/>
                                {SHELF_TITLE.SHELF_READ}
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
                                <Shelf onChangeShelfBook={this.changeShelfBook} books={books} loading={loading}
                                       shelfTitle={SHELF_TITLE} shelf={SHELF_WANT_TO_READ}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
