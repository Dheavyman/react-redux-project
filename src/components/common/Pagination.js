import React, { PropTypes } from 'react';

class Pagination extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentPage: 1,
      itemsPerPage: 2
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    const {
      currentPage,
      itemsPerPage
    } = this.props;
    this.setState(() => ({
      currentPage: currentPage ? currentPage : this.state.currentPage,
      itemsPerPage: itemsPerPage ? itemsPerPage : this.state.itemsPerPage
    }), this.getPageItems);
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.getPageItems();
    }
  }

  getPageItems() {
    const { currentPage, itemsPerPage } = this.state;
    const { items, onPageChange } = this.props;
    let lastItemIndex = currentPage * itemsPerPage;
    let firstItemIndex = lastItemIndex - itemsPerPage;
    let pageItems = items.slice(firstItemIndex, lastItemIndex);

    if (items.length !== 0 && pageItems.length === 0) {
      lastItemIndex = (currentPage - 1) * itemsPerPage;
      firstItemIndex = lastItemIndex - itemsPerPage;
      pageItems = items.slice(firstItemIndex, lastItemIndex);
      this.setState({
        currentPage: currentPage - 1
      });
    }

    onPageChange(pageItems);
  }

  getPageNumbers() {
    const { items } = this.props;
    const { itemsPerPage } = this.state;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    let pageNumbers = [];
    for(let number = 1; number <= totalPages; number += 1) {
      pageNumbers.push(number);
    }
    return pageNumbers;
  }

  handlePageChange(event) {
    event.preventDefault();

    const { text } = event.target;
    this.setState(() => ({
      currentPage: parseInt(text, 10)
    }), this.getPageItems);
  }

  render() {
    if (this.props.items.length <= this.state.itemsPerPage) {
      return null;
    }
    return (
      <div className="text-center">
        <ul className="pagination">
          {this.getPageNumbers().map(number => (
            <li
              id={number}
              key={number.toString()}
              onClick={this.handlePageChange}
              className={number === this.state.currentPage ? 'active' : ''}
            >
              <a href="#">{number}</a>
            </li>
          ))
          }
        </ul>
      </div>
    );
  }
}

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
