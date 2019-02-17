import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import Auth from './AuthService';
import Notification from './Notification';

import '../css/User.css';

const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');

/**
 * Fetch configuration through
 */
const myHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
});

const myInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default',
};

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      failed: false,
      message: '',
      user: {},
      saves: [],
      page: 1,
      pages: 1,
      editable: false,
    };
  }

  componentDidMount = () => {
    this.fetchUserData();
    this.fetchSaves();
  };

  fetchUserData = async () => {
    const { match } = this.props;
    try {
      const res = await fetch(
        `${configuration.API.URL}:${configuration.API.PORT}/users/${
          match.params.id
        }`,
      );
      const jsonRes = await res.json();
      let editable = false;
      if (Auth.loggedIn()) {
        const profile = Auth.getProfile();
        editable = profile.authLevel !== 2
          || profile.id === parseInt(match.params.id, 10);
      }
      this.setState({ user: jsonRes, failed: false, editable });
    } catch (err) {
      this.setState({ failed: true, message: 'Failed to retrieve user data' });
    }
  };

  fetchSaves = async () => {
    const { match } = this.props;
    const { location } = this.props;
    const query = new URLSearchParams(location.search).get('page') || 1;

    try {
      const res = await fetch(
        `${configuration.API.URL}:${configuration.API.PORT}/users/${
          match.params.id
        }/saves?page=${query}`,
        myInit,
      );
      const jsonRes = await res.json();
      const { saves, page, pages } = jsonRes;
      this.setState({
        saves,
        page,
        pages,
      });
    } catch (err) {
      this.setState({
        saves: [],
        page: 1,
        pages: 1,
      });
    }
  };

  renderSaves() {
    const { saves } = this.state;

    if (saves.length === 0) {
      return <div>No saves here :(</div>;
    }

    return saves.map(save => (
      <div key={save.id}>
        <p>
          <a
            role="button"
            href={`${configuration.API.URL}:${
              configuration.API.PORT
            }/static/saves/${save.uploadTimestamp}-${save.file}`}
            download={`${save.file}`}
          >
            {save.file}
          </a>
          {` (uploaded ${new Date(save.createdAt).toLocaleDateString()})`}
        </p>

        <div className="italic">
          {' for '}
          <a href={`/games/${save.gameId}`}>{save.Game.name}</a>
        </div>
        <hr />
      </div>
    ));
  }

  renderNotification() {
    const { location } = this.props;
    if (location && location.state && location.state.message) {
      return (
        <Notification
          failed={location.state.failed}
          message={location.state.message}
        />
      );
    }
    return <></>;
  }

  renderSavesPages() {
    const { location } = this.props;
    const { page, pages } = this.state;
    const items = [];
    if (pages > 1) {
      for (let number = 1; number <= pages; number += 1) {
        const href = `${location.pathname}?page=${number}`;
        const active = number === parseInt(page, 10);
        items.push(
          // eslint-disable-next-line max-len
          <Pagination.Item key={number} active={active} href={href}>{number}</Pagination.Item>,
        );
      }
    }
    return items;
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
    const {
      user, failed, message, editable,
    } = this.state;

    return failed ? (
      <Redirect
        to={{
          pathname: '/',
          state: { failed, message },
        }}
      />
    ) : (
      <>
        {this.renderNotification()}
        <div className="User">
          <div className="pure-g center text-center align-items-center">
            <h3 className="pure-u-1">{user.nickname}</h3>
            <div className="pure-u-1-5">
              <img
                className="icon"
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
                      <td className="">Biography</td>
                      <td className="text-left">{user.biography}</td>
                    </tr>
                  )}
                  <tr>
                    <td className="">Auth level</td>
                    <td className="text-left">
                      {user.authLevel === 0 ? 'Admin' : 'User'}
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
                  Edit
                </div>
              </a>
            </div>
          )}
          <h2>Saves</h2>
          <hr />
          {this.renderSaves()}
          <div>
            <Pagination>{this.renderSavesPages()}</Pagination>
          </div>
        </div>
      </>
    );
  }
}

User.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      failed: PropTypes.bool,
      message: PropTypes.string,
    }),
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }),
};

User.defaultProps = {
  match: { params: { id: 0 } },
  location: { state: { failed: false, message: '' } },
};

export default User;
