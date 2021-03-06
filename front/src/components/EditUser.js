import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Auth from './AuthService';
import '../css/User.css';

const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');

class EditUser extends React.Component {
  // Form to edit an existing user
  constructor(props) {
    super(props);

    this.state = {
      failed: false,
      message: '',
      user: {
        id: props.match.params.id,
        nickname: '',
        email: '',
        biography: '',
      },
      redirect: false,
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    const { match } = this.props;
    try {
      // Try to GET current user data
      const res = await fetch(
        `${configuration.API.URL}:${configuration.API.PORT}/users/${
          match.params.id
        }`,
      );

      const jsonRes = await res.json();

      this.setState({ user: jsonRes, failed: false });
    } catch (err) {
      // Failure: show notification and go back to game page
      this.setState({ failed: true, message: 'Failed to retieve user data.' });
    }
  };

  handleInputChange = (event) => {
    const { value, name } = event.target;
    const { user } = this.state;
    this.setState({
      user: Object.assign(user, { [name]: value }),
    });
  };

  handleSubmit = (event) => {
    const { user } = this.state;
    (async () => {
      try {
        // Try to PUT user data
        await Auth.fetch(
          `${configuration.API.URL}:${configuration.API.PORT}/users/${user.id}`,
          {
            method: 'PUT',
            body: JSON.stringify({ user }),
            mode: 'cors',
            cache: 'default',
          },
        );
        // User updated ; go back to the user's page
        this.setState({
          redirect: true,
          message: 'Successfully updated user!',
        });
      } catch (err) {
        // Update failed ; go back to the game's page
        this.setState({ failed: true, message: 'Failed to update user data.' });
      }
    })();
    event.preventDefault();
  };

  render() {
    const {
      user,
      failed,
      message,
      redirect,
    } = this.state;

    if (redirect || failed) {
      return (
        <Redirect
          to={{
            pathname: `/users/${user.id}`,
            state: { failed, message },
          }}
        />
      );
    }

    return (
      <div className="center">
        <form
          onSubmit={this.handleSubmit}
          className="pure-form pure-form-aligned EditUser"
        >
          <fieldset>
            <legend className="pure-u-1">
              {`Edit ${user.nickname}'s profile`}
            </legend>
            <div className="pure-control-group">
              <label htmlFor="nickname" className="pure-u-1-3">
                Nickname
              </label>
              <input
                className="pure-input-2-3"
                id="nickname"
                type="text"
                name="nickname"
                placeholder="Nickname"
                value={user.nickname}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="pure-control-group">
              <label htmlFor="email" className="pure-u-1-3">
                Email
              </label>
              <input
                className="pure-input-2-3"
                id="email"
                type="text"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="pure-control-group">
              <label htmlFor="biography" className="pure-u-1-3">
                Biography
              </label>
              <textarea
                id="biography"
                className="pure-input-2-3"
                name="biography"
                placeholder="Biography"
                value={user.biography}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="pure-controls">
              <button
                type="submit"
                className="pure-button pure-button-primary"
                onClick={this.handleSubmit}
              >
                Save
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

EditUser.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

EditUser.defaultProps = {
  match: { params: { id: 0 } },
};

export default EditUser;
