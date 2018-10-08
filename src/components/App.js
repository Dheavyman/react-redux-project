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
    return (
      <div className="container-fluid">
        <Header loading={this.props.loading} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  loading: state.numAjaxCallsInProgress > 0
});

export default connect(mapStateToProps)(App);
