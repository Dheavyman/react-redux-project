import React,  {  PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from './common/Header';

/**
 * App component
 *
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof App
   */
  render() {
    const { courses } = this.props;

    return (
      <div className="container-fluid">
        <Header loading={this.props.loading} courses={courses} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  courses: state.courses,
  loading: state.numAjaxCallsInProgress > 0
});

export default connect(mapStateToProps)(App);
