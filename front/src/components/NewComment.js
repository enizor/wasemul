import React from 'react';
import Auth from './AuthService';

class NewComment extends React.Component {
  state = {
    comment: '',
    error: false,
  };

  handleInputChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    const { comment } = this.state;
    (async () => {
      try {
        const { props: { gameID, fetchComments } } = this;
        await Auth.fetch(
          `http://localhost:3001/games/${gameID}/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            mode: 'cors',
            cache: 'default',
          },
        );
        fetchComments();
        this.state.error = false;
      } catch (err) {
        this.state.error = true;
      }
    })();
    event.preventDefault();
  }

  render() {
    return !Auth.loggedIn() ? null : (
      <form className="pure-form">
        <fieldset className="pure-group">
          <textarea
            className="pure-input-1-2"
            placeholder="Type your comment here..."
            name="comment"
            onChange={this.handleInputChange}
          />
        </fieldset>

        <button
          type="submit"
          className="pure-button pure-button-primary"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </form>
    );
  }
}


export default NewComment;
