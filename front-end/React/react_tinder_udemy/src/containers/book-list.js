import React, { Component } from "react";
import { connect } from "react-redux";
import { selectBook } from "../actions";
import { bindActionCreators } from "redux";

class BookList extends Component {
  renderList() {
    return this.props.books.map(book => {
      return (
        <li
          key={book.title}
          className="list-group-item"
          onClick={() => this.props.selectBook(book)}
        >
          {book.title}
        </li>
      );
    });
  }
  render() {
    return <ul className="list-group col-sm-4">{this.renderList()}</ul>;
  }
}

// Anything returns from this function will end up as props on the BookList container.
function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result should be passed to all of our reducers.
  return bindActionCreators({ selectBook: selectBook }, dispatch);
}

function mapStateToProps(state) {
  return {
    books: state.books
  };
}

// Promote BookList from a component to a container. It needs to know about this new dispatch method, // selectBook. Make it availble as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
