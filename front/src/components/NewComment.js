import React from 'react';
import PropTypes from 'prop-types';
import Auth from './AuthService';


const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');

class NewComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      failed: false,
      message: '',
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    const { comment } = this.state;

    if (comment === '') {
      return;
    }

    (async () => {
      try {
        const { props: { gameID, fetchComments } } = this;
        await Auth.fetch(
          // eslint-disable-next-line max-len
          `${configuration.API.URL}:${configuration.API.PORT}/games/${gameID}/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            mode: 'cors',
            cache: 'default',
          },
        );
        fetchComments();
        this.setState({
          error: false,
          comment: '',
        });
      } catch (err) {
        this.state.error = true;
      }
    })();
    event.preventDefault();
  }

  render() {
    const { comment } = this.state;
    return !Auth.loggedIn() ? null : (
      <form className="pure-form NewComment">
        <fieldset className="pure-group">
          <legend className="pure-u-1">
            Add a comment
          </legend>
          <textarea
            className="pure-input-1-2"
            placeholder="Type your comment here..."
            name="comment"
            value={comment}
            onChange={this.handleInputChange}
          />
        </fieldset>

        <button
          type="submit"
          className="pure-button pure-button-primary"
          onClick={this.handleSubmit}
          disabled={comment === ''}
        >
          Send
        </button>
      </form>
    );
  }
}

NewComment.propTypes = {
  gameID: PropTypes.string.isRequired,
  fetchComments: PropTypes.func.isRequired,
};

export default NewComment;
