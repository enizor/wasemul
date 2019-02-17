import React from 'react';
import PropTypes from 'prop-types';

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayed: true,
    };
  }

  disable = () => {
    this.setState({ displayed: false });
  }

  render() {
    const { failed, message } = this.props;
    const { displayed } = this.state;
    return (displayed
      ? (
        <div
          role="button"
          tabIndex="0"
          onKeyPress={this.disable}
          onClick={this.disable}
        >
          <div
            className={failed
              ? 'bg-danger notification'
              : 'bg-success notification'}
          >
            {message}
          </div>
        </div>

      )
      : <></>);
  }
}

Notification.propTypes = {
  failed: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default Notification;
