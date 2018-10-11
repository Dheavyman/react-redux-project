import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

import LoadingDots from './LoadingDots';

/**
 * Header component
 *
 * @returns {object} React element
 */
const Header = ({courses, loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/courses" activeClassName="active">
        Courses [{courses.length}]
      </Link>
      {" | "}
      <Link to="/authors" activeClassName="active">Authors</Link>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
      {loading && <LoadingDots interval={100} dots={20} />}
    </nav>
  );
};

Header.propTypes = {
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Header;
