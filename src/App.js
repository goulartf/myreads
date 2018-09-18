import React, {Component} from 'react';
import {NavLink, Route} from 'react-router-dom'
import './App.css';
import logo from './logo.png';
//TOASTFY
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
//API
import * as BooksAPI from './Api/BooksAPI'
//COMPONENTS
import Shelf from "./Shelf";
import Search from "./Search";

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


    notify = (msg) => toast.success(msg, {
        position: 'top-center'
    });

    state = {
        books: [{}, {}, {}],
        loading: true
    };

    componentDidMount() {

        this.getAllBooks();

    }

    getAllBooks = () => {


        this.setState({loading: true})
        BooksAPI.getAll().then((books) => {

            this.setState({loading: false})
            this.setState({books});

        })

    };

    changeShelfBook = (_book, shelf) => {

        if (_book.shelf === shelf)
            return false;


        BooksAPI.update(_book, shelf).then(() => {

            this.notify('Book update with success');
            let books = this.state.books;

            //If not exists add
            const existBook = books.filter(book => _book.id === book.id);
            if (existBook.length === 0) {
                books.push(_book);
            }

            //Insert new Shelf
            books.map(book => {
                if (_book.id === book.id) {
                    book.shelf = shelf;
                }
                return book;
            });


            this.setState({"books": books});

        });

    };

    render() {

        const {books, loading} = this.state;

        return (
            <div>

                <ToastContainer/>

                <div className="app-container">

                    <div className="side-menu">
                        <div className="profile-section">
                            <a className="logo-wrapper" href="/">
                                <img src={logo} className="logo" alt="My Reads"/>
                                <h2>MY READS</h2>
                            </a>
                        </div>
                        <ul className="menu-list">
                            <NavLink exact={true} to="/" activeClassName={"active"} className={"menu-item"}>
                                <i className="eye icon"/>
                                {SHELF_TITLE.SHELF_CURRENTLY_READING}
                            </NavLink>
                            <NavLink to="/want-to-read" className="menu-item">
                                <i className="heart icon"/>
                                {SHELF_TITLE.SHELF_WANT_TO_READ}
                            </NavLink>
                            <NavLink to="/read" className="menu-item">
                                <i className="archive icon"/>
                                {SHELF_TITLE.SHELF_READ}
                            </NavLink>
                            <NavLink to="/search" className="menu-item">
                                <i className="search icon"/>
                                Search
                            </NavLink>
                        </ul>
                    </div>

                    <div className="feed-container">
                        <div>
                            <Route exact path='/' render={() => (
                                <Shelf onChangeShelfBook={this.changeShelfBook} books={books} loading={loading}
                                       shelf={SHELF_CURRENTLY_READING}/>
                            )}/>
                            <Route exact path='/want-to-read' render={() => (
                                <Shelf onChangeShelfBook={this.changeShelfBook} books={books} loading={loading}
                                       shelf={SHELF_WANT_TO_READ}/>
                            )}/>
                            <Route exact path='/read' render={() => (
                                <Shelf onChangeShelfBook={this.changeShelfBook} books={books} loading={loading}
                                       shelf={SHELF_READ}/>
                            )}/>
                            <Route exact path='/search' render={() => (
                                <Search shelfbooks={books} onChangeShelfBook={this.changeShelfBook}/>
                            )}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
