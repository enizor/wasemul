import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './EditUser.css';

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      failed: false,
      user: {
        id: 0,
        nickname: '',
        email: '',
        biography: '',
      },
      redirect: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    fetch(`http://localhost:3001/users/${match.params.id}`)
      .then(res => res.json())
      .then((result) => {
        this.setState({ user: result, failed: false });
      })
      .catch(() => {
        this.setState({ failed: true });
      });
  }

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
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
        await fetch(`http://localhost:3001/users/${user.id}`, {
          headers,
          method: 'PUT',
          body: JSON.stringify({ user }),
          mode: 'cors',
          cache: 'default',
        });
        this.setState({ redirect: true });
      } catch (err) {
        this.setState({ failed: true });
      }
    })();
    event.preventDefault();
  };

  //   {
  //     "id": 1,
  //     "nickname": "test",
  //     "email": "test@example.com",
  //     "authLevel": 0,
  //     "biography": null,
  //     "icon": null,
  //     "enabled": null,
  //     "createdAt": "2018-12-10T15:03:34.773Z",
  //     "updatedAt": "2018-12-10T15:03:34.773Z"
  //     }
  render() {
    const { user, failed, redirect } = this.state;

    if (redirect === true) {
      return <Redirect to={`/users/${user.id}`} />;
    }

    return failed ? (
      <Redirect to="/" />
    ) : (
      <div className="pure-g center">
        <h2 className="pure-u-1 text-center">
          {`Edition du profil de ${user.nickname}`}
        </h2>
        <form
          onSubmit={this.handleSubmit}
          className="pure-form pure-form-aligned EditUser"
        >
          <fieldset>
            <div className="pure-control-group">
              <label htmlFor="nickname" className="pure-u-1">
                Surnom
              </label>
              <input
                className="pure-input-2-3"
                id="nickname"
                type="text"
                name="nickname"
                placeholder="Surnom"
                value={user.nickname}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="pure-control-group">
              <label htmlFor="email" className="pure-u-1">
                Email
              </label>
              <input
                className="pure-input-2-3"
                id="email"
                type="text"
                name="nickname"
                placeholder="Email"
                value={user.email}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="pure-control-group">
              <label htmlFor="biography" className="pure-u-1">
                Biographie
              </label>
              <textarea
                id="biography"
                cols="30"
                rows="5"
                name="biography"
                placeholder="Biographie"
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
                Sauvegarder
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
