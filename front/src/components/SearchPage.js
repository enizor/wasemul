import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import GameItem from './GameItem';
import UserItem from './UserItem';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      failed: false,
      users: [],
      games: [],
    };
  }

  componentDidMount = () => {
    this.fetchQuery();
  };

  componentDidUpdate = (prevProps) => {
    const { match } = this.props;
    if (match.params.query !== prevProps.match.params.query) this.fetchQuery();
  };

  fetchQuery = () => {
    const { match } = this.props;
    fetch(`http://localhost:3001/search?query=${match.params.query}`)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          users: result.users,
          failed: false,
          games: result.games,
        });
      })
      .catch(() => {
        alert('Search Failed. Redirecting to home.');
        this.setState({ failed: true });
      });
  };

  render = () => {
    const { failed, games, users } = this.state;
    return failed ? (
      <Redirect to="/" />
    ) : (
      <div>
        <h1>Games</h1>
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
        <h1>Users</h1>
        {users.map(e => (
          <UserItem key={e.id} id={e.id} nickname={e.nickname} icon={e.icon} />
        ))}
      </div>
    );
  };
}

SearchPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      query: PropTypes.string.isRequired,
    }),
  }),
};

SearchPage.defaultProps = {
  match: { params: { id: 0 } },
};
