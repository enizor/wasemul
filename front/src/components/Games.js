import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import GameItem from './GameItem';
import Notification from './Notification';
import Auth from './AuthService';

const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');

class Games extends Component {
  // List of games page
  constructor(props) {
    super(props);

    this.state = {
      failed: false,
      message: '',

      // Games pagination
      games: [],
      page: 1,
      pages: 1,

      // Can the user add a game?
      addable: false,
    };
  }

  componentDidMount = () => {
    this.fetchGames();
  };

  componentDidUpdate = (prevProps) => {
    const { location } = this.props;
    if (location.search !== prevProps.location.search) this.fetchGames();
  };

  fetchGames = async () => {
    const { location } = this.props;
    const query = new URLSearchParams(location.search).get('page') || 1;

    try {
      // Try to GET games data
      const res = await fetch(
        `${configuration.API.URL}:${
          configuration.API.PORT
        }/games?page=${query}`,
      );
      const jsonRes = await res.json();
      const { games, page, pages } = jsonRes;

      // Verify if user can add a game
      let addable = false;

      if (Auth.loggedIn()) {
        const profile = Auth.getProfile();
        addable = profile.authLevel !== 2;
      }

      this.setState({
        games,
        page,
        pages,
        failed: false,
        addable,
      });
    } catch (err) {
      // Games list retrieval failed ; go back to main page
      this.setState({
        failed: true,
        message: 'Failed to retrieve games data.',
      });
    }
  };

  renderGames() {
    const { games } = this.state;
    return games.map(e => (
      <GameItem
        key={e.id}
        id={e.id}
        name={e.name}
        publisher={e.publisher}
        releaseDate={e.releaseDate}
        icon={e.icon}
      />
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

  render() {
    const { location } = this.props;

    const {
      failed, message, page, pages, addable,
    } = this.state;

    const items = [];
    if (pages > 1) {
      for (let number = 1; number <= pages; number += 1) {
        const href = `${location.pathname}?page=${number}`;
        const active = number === parseInt(page, 10);
        items.push(
          // eslint-disable-next-line max-len
          <Pagination.Item key={number} active={active} href={href}>
            {number}
          </Pagination.Item>,
        );
      }
    }

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
        <div className="Game">
          <div className="pure-g center">
            <div className="pure-u-4-5">
              <h2 className="pure-u-2-3 text-left">All games</h2>
              {addable && (
                <a
                  className="pure-u-1-3 vertical-align text-right"
                  href="/games/create"
                >
                  <div className="pure-button pure-button-primary">
                    Add new game
                  </div>
                </a>
              )}
            </div>
            {this.renderGames()}
          </div>
          <div>
            <Pagination>{items}</Pagination>
          </div>
        </div>
      </>
    );
  }
}

Games.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    state: PropTypes.shape({
      failed: PropTypes.bool,
      message: PropTypes.string,
    }),
  }),
};

Games.defaultProps = {
  location: { search: '?page=1', state: { failed: false, message: '' } },
};

export default Games;
