import React,  {  PropTypes } from 'react';

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
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
