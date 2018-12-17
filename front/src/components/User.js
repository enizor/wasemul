import React from 'react';
import PropTypes from 'prop-types';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    fetch(`http://localhost:3001/users/${match.params.id}`)
      .then(res => res.json())
      .then((result) => {
        this.setState({ user: result });
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
    const { user } = this.state;
    return (
      <div className="App pure-g center">
        <h1 className="pure-u-3-5 text-left">Utilisateur</h1>
        <p>
          Nickname:
          {user.nickname}
        </p>
        <p>
          Email:
          {user.email}
        </p>
        {user.biography != null && (
          <p>
            Biography:
            {user.biography}
          </p>
        )}
      </div>
    );
  }
}

User.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }),
};

User.defaultProps = {
  match: { params: { id: 0 } },
};

export default User;
