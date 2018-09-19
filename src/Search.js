import _ from 'lodash'
import React, {Component} from 'react';
import {Search as Autocomplete} from 'semantic-ui-react'
import escapeRegExp from 'escape-string-regexp'

//API
import * as BooksAPI from './Api/BooksAPI'
import BookCard from "./Book/BookCard";
import BookCardPlaceholder from "./Book/BookCardPlaceholder";

const TERMS_SEARCH = [{title: 'Android'}, {title: 'Art'}, {title: 'Artificial Intelligence'}, {title: 'Astronomy'}, {title: 'Austen'}, {title: 'Baseball'}, {title: 'Basketball'}, {title: 'Bhagat'}, {title: 'Biography'}, {title: 'Brief'}, {title: 'Business'}, {title: 'Camus'}, {title: 'Cervantes'}, {title: 'Christie'}, {title: 'Classics'}, {title: 'Comics'}, {title: 'Cook'}, {title: 'Cricket'}, {title: 'Cycling'}, {title: 'Desai'}, {title: 'Design'}, {title: 'Development'}, {title: 'Digital Marketing'}, {title: 'Drama'}, {title: 'Drawing'}, {title: 'Dumas'}, {title: 'Education'}, {title: 'Everything'}, {title: 'Fantasy'}, {title: 'Film'}, {title: 'Finance'}, {title: 'First'}, {title: 'Fitness'}, {title: 'Football'}, {title: 'Future'}, {title: 'Games'}, {title: 'Gandhi'}, {title: 'Homer'}, {title: 'Horror'}, {title: 'Hugo'}, {title: 'Ibsen'}, {title: 'Journey'}, {title: 'Kafka'}, {title: 'King'}, {title: 'Lahiri'}, {title: 'Larsson'}, {title: 'Learn'}, {title: 'Literary Fiction'}, {title: 'Make'}, {title: 'Manage'}, {title: 'Marquez'}, {title: 'Money'}, {title: 'Mystery'}, {title: 'Negotiate'}, {title: 'Painting'}, {title: 'Philosophy'}, {title: 'Photography'}, {title: 'Poetry'}, {title: 'Production'}, {title: 'Programming'}, {title: 'React'}, {title: 'Redux'}, {title: 'River'}, {title: 'Robotics'}, {title: 'Rowling'}, {title: 'Satire'}, {title: 'Science Fiction'}, {title: 'Shakespeare'}, {title: 'Singh'}, {title: 'Swimming'}, {title: 'Tale'}, {title: 'Thrun'}, {title: 'Time'}, {title: 'Tolstoy'}, {title: 'Travel'}, {title: 'Ultimate'}, {title: 'Virtual Reality'}, {title: 'Web Development'}, {title: 'iOS'}];

class Search extends Component {

    state = {value: '', books: [], results: TERMS_SEARCH, loading: false};

    handleResultSelect = (e, {result}) => {

        this.setState({value: result.title, loading: true});

        BooksAPI.search(this.state.value).then((books) => {
            this.setState({books, loading: false});
        });

    };

    handleSearchChange = (e, {value}) => {

        const match = new RegExp(escapeRegExp(value), 'i');
        let results = TERMS_SEARCH.filter((term) => match.test(term.title));
        this.setState({value, results});

    };

    render() {

        const {value, results, books, loading} = this.state;
        const {shelfbooks, onChangeShelfBook} = this.props;


        return (
            <React.Fragment>
                <div className="filter-row">
                    <div className="ui search">
                        <div className="ui icon input">
                            <Autocomplete
                                onResultSelect={this.handleResultSelect}
                                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                                results={results}
                                value={value}
                                {...this.props}
                                placeholder={"Search here ..."}
                            />
                        </div>
                    </div>
                </div>

                <div className="books-container">

                    {loading && (
                        <BookCardPlaceholder size={4} />
                    )}

                    {!loading && (books.map((book) => (

                        <BookCard book={book} shelfbooks={shelfbooks} onChangeShelfBook={onChangeShelfBook} key={book.id}/>

                    )))}

                </div>

            </React.Fragment>
        );
    }
}

export default Search;
