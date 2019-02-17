import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import GameItem from './GameItem';
import UserItem from './UserItem';

const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');

const defaultUserImage =  'https://www.autourdelacom.fr/wp-content/uploads/2018/03/default-user-image.png'; // eslint-disable-line
const defaultGameImage =  'https://www.nationalpetregister.org/assets/img/no-photo.jpg'; // eslint-disable-line

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      failed: false,
      message: '',
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

  fetchQuery = async () => {
    const { match } = this.props;
    try {
      const res = await fetch(
        `${configuration.API.URL}:${configuration.API.PORT}/search?query=${
          match.params.query
        }`,
      );
      const jsonRes = await res.json();
      this.setState({
        users: jsonRes.users,
        failed: false,
        games: jsonRes.games,
      });
    } catch (err) {
      // eslint-disable-next-line no-alert
      this.setState({ failed: true, message: 'Search failed.' });
    }
  };

  render = () => {
    const {
      failed,
      message,
      games,
      users,
    } = this.state;

    return failed ? (
      <Redirect
        to={{
          pathname: '/',
          state: { failed, message },
        }}
      />
    ) : (
      <div>
        <h2>Games</h2>
        {games.map(e => (
          <GameItem
            key={e.id}
            id={e.id}
            name={e.name}
            publisher={e.publisher}
            releaseDate={e.releaseDate}
            icon={e.icon || defaultGameImage}
          />
        ))}
        <h2>Users</h2>
        {users.map(e => (
          <UserItem
            key={e.id}
            id={e.id}
            nickname={e.nickname}
            icon={e.icon || defaultUserImage}
          />
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
