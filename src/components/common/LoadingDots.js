import React, { PropTypes } from 'react';

/**
 * Loading dots component
 *
 * @class LoadingDots
 * @extends {React.Component}
 */
class LoadingDots extends React.Component {
  /**
   *Creates an instance of LoadingDots.
   *
   * @param {object} props - Properties passed to component
   * @param {object} context - Context passed to component
   * @memberof LoadingDots
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      frame: 1
    };
  }

  /**
   * Component did mount life cycle method
   *
   * @memberof LoadingDots
   */
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ // eslint-disable-line react/no-did-mount-set-state
        frame: this.state.frame + 1
      });
    }, this.props.interval);
  }

  /**
   * Component will unmount life cycle method
   *
   * @memberof LoadingDots
   */
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof LoadingDots
   */
  render() {
    let dots =  this.state.frame % (this.props.dots + 1);
    let text = '';

    while (dots > 0) {
      text += '.';
      dots--;
    }

    return (
      <span>{text}&nbsp;</span>
    );
  }
}

LoadingDots.propTypes = {
  interval: PropTypes.number,
  dots: PropTypes.number
};

LoadingDots.defaultProps = {
  interval: 300,
  dots: 3
};

export default LoadingDots;
