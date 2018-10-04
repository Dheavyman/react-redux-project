import React from 'react';

/**
 * About page component
 *
 * @class AboutPage
 * @extends {React.Component}
 */
class AboutPage extends React.Component {
  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof AboutPage
   */
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>This application uses React, Redux, React Router and a variety of
          other helpful libraries.</p>
      </div>
    );
  }
}

export default AboutPage;
