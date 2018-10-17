import React, { PropTypes } from 'react';

/**
 * Pagination component
 *
 * @class Pagination
 * @extends {React.Component}
 */
class Pagination extends React.Component {
  /**
   *Creates an instance of Pagination.
   *
   * @param {object} props - Properties passed to component
   * @param {object} context - Context passed to component
   * @memberof Pagination
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentPage: 1,
      itemsPerPage: 2
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /**
   * Component will mount life cycle method
   *
   * @memberof Pagination
   */
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

  /**
   * Component did update life cycle method
   *
   * @param {object} prevProps - Previous properties passed to component
   * @memberof Pagination
   */
  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.getPageItems();
    }
  }

  /**
   * Get page items
   *
   * @memberof Pagination
   */
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

  /**
   * Get page numbers
   *
   * @returns {array} Page numbers
   * @memberof Pagination
   */
  getPageNumbers() {
    const { items } = this.props;
    const { currentPage, itemsPerPage } = this.state;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    let pageNumbers = [];

    for(let number = 1; number <= totalPages; number += 1) {
      pageNumbers.push(number);
    }

    if (totalPages > 5) {
      if (currentPage < 4) {
        pageNumbers = pageNumbers.slice(0, 5);
      } else if (pageNumbers[pageNumbers.length - 1] - currentPage > 2) {
        pageNumbers = pageNumbers.slice(currentPage - 3, currentPage + 2);
      } else {
        pageNumbers = pageNumbers
          .slice(pageNumbers.length - 5, pageNumbers.length);
      }
    }

    return pageNumbers;
  }

  /**
   * Handle page change event handler
   *
   * @param {object} event - Event object
   * @memberof Pagination
   */
  handlePageChange(event) {
    event.preventDefault();
    const { text } = event.target;

    if (text === 'Previous') {
      this.setState(prevState => ({
        currentPage: prevState.currentPage - 1
      }), this.getPageItems);
    } else if (text === 'Next') {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1
      }), this.getPageItems);
    } else {
      this.setState(() => ({
        currentPage: parseInt(text, 10)
      }), this.getPageItems);
    }
  }

  /**
   * Render pagination component
   *
   * @returns {object} React element
   * @memberof Pagination
   */
  renderPaginationComponent() {
    const { currentPage } = this.state;

    return (
      <ul className="pagination">
          {currentPage > 1
          && (
              <li
                id="previous"
                onClick={this.handlePageChange}
              >
                <a href="#">Previous</a>
              </li>
          )
          }
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
          {currentPage < this.getPageNumbers()[this.getPageNumbers().length - 1]
          && (
              <li
                id="next"
                onClick={this.handlePageChange}
              >
                <a href="#">Next</a>
              </li>
          )
          }
        </ul>
    );
  }

  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof Pagination
   */
  render() {

    return (
      <div className="text-center">
        {this.props.items.length > this.state.itemsPerPage
        ? this.renderPaginationComponent()
        : null
        }
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
