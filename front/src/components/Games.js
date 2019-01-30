import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import GameItem from './GameItem';

const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');

class Games extends Component {
  constructor(props) {
    super(props);

    this.state = {
      failed: false,
      games: [],
      page: 1,
      pages: 1,
    };
  }

  componentDidMount = () => {
    this.fetchGames();
  };

  componentDidUpdate = (prevProps) => {
    const { location } = this.props;
    if (location.search !== prevProps.location.search) this.fetchGames();
  }

  fetchGames = () => {
    const { location } = this.props;
    const query = new URLSearchParams(location.search).get('page') || 1;
    // API call this.state.id
    // eslint-disable-next-line max-len
    fetch(`${configuration.API.URL}:${configuration.API.PORT}/games?page=${query}`)
      .then(res => res.json())
      .then((json) => {
        const { games, page, pages } = json;
        this.setState(
          {
            games,
            page,
            pages,
            failed: false,
          },
        );
      }).catch(() => {
        this.setState({ failed: true });
      });
  };

  render() {
    const { location } = this.props;
    const {
      failed,
      games,
      page,
      pages,
    } = this.state;
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


    return failed ? (
      <Redirect to="/" />
    ) : (
      <div>
        <div className="App pure-g center">
          <h1 className="pure-u-3-5 text-left">Games</h1>
          {games.map(e => (
            <GameItem
              key={e.id}
              id={e.id}
              name={e.name}
              publisher={e.publisher}
              releaseDate={e.releaseDate}
              icon={e.icon}
            />
          ))}
        </div>
        <div>
          <Pagination>{items}</Pagination>
        </div>
      </div>
    );
  }
}

Games.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
};

Games.defaultProps = {
  location: { search: '?page=1' },
};

export default Games;
