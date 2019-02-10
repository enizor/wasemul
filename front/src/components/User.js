import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Auth from './AuthService';

const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      failed: false,
      user: {},
      editable: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    fetch(
      `${configuration.API.URL}:${configuration.API.PORT}/users/${
        match.params.id
      }`,
    )
      .then(res => res.json())
      .then((result) => {
        let editable = false;
        if (Auth.loggedIn()) {
          const profile = Auth.getProfile();
          editable = profile.authLevel !== 2
          || profile.id === parseInt(match.params.id, 10);
        }
        this.setState({ user: result, failed: false, editable });
      })
      .catch(() => {
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
    const { user, failed, editable } = this.state;
    return failed ? (
      <Redirect to="/" />
    ) : (
      <div className="User">
        <div className="pure-g center text-center align-items-center">
          <h3 className="pure-u-1">{user.nickname}</h3>
          <div className="pure-u-1-5">
            <img
              className="avatar"
              src={
                user.icon
                // eslint-disable-next-line max-len
                || 'http://itibalasore.org/wp-content/uploads/2018/02/default-user-male.png'
              }
              alt="user pic"
            />
          </div>
          <div className="pure-u-3-5">
            <table className="pure-table pure-u-1">
              <tbody>
                <tr>
                  <td className="">Email</td>
                  <td className="text-left">{user.email}</td>
                </tr>
                {user.biography != null && (
                  <tr>
                    <td className="">Biographie</td>
                    <td className="text-left">{user.biography}</td>
                  </tr>
                )}
                <tr>
                  <td className="">Niveau auth</td>
                  <td className="text-left">
                    {user.authLevel === 0 ? 'User' : 'Admin'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
        {editable && (
          <div className="pure-g center">
            <a className="pure-u-1-5" href={`/users/${user.id}/edit`}>
              <div className="pure-button pure-u-1 pure-button-primary">
                Editer
              </div>
            </a>
          </div>
        )}
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
