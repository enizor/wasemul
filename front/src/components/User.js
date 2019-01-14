import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      failed: false,
      user: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    fetch(`https://${document.location.hostname}:3001/users/${match.params.id}`)
      .then(res => res.json())
      .then((result) => {
        this.setState({ user: result, failed: false });
      })
      .catch(() => {
        alert('Could not load this user. Redirecting to home.');
        this.setState({ failed: true });
      });
  }

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
    const { user, failed } = this.state;
    return failed ? (
      <Redirect to="/" />
    ) : (
      <div className="pure-g">
        <img
          className="pure-img"
          src={
            user.icon
            // eslint-disable-next-line max-len
            || 'http://itibalasore.org/wp-content/uploads/2018/02/default-user-male.png'
          }
          alt="user pic"
        />
        <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
          <p className="pure-u-1">
            Surnom:
            {user.nickname}
          </p>
          <p className="pure-u-1">
            Email:
            {user.email}
          </p>
          {user.biography != null && (
            <p className="pure-u-1">
              Biographie:
              {user.biography}
            </p>
          )}
          <p className="pure-u-1">
            Auth:
            {user.authLevel}
          </p>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

User.defaultProps = {
  match: { params: { id: 0 } },
};

export default User;
