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
    fetch(`http://localhost:3001/users/${match.params.id}`)
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
        <div className="pure-g center">
          <a className="pure-u-1-5" href={`/users/${user.id}/edit`}>
            <div className="pure-button pure-u-1 pure-button-primary">
              Editer
            </div>
          </a>
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
