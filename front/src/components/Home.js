import React from 'react';
import PropTypes from 'prop-types';
import GameItem from './GameItem';
import Notification from './Notification';
import '../css/Home.css';

const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');

class Home extends React.Component {
  // Main page of the app
  constructor(props) {
    super(props);

    this.state = {
      games: [],
    };
  }

  componentDidMount = () => {
    this.fetchFeaturedGames();
  };

  fetchFeaturedGames = async () => {
    try {
      // Try to GET featured games
      const res = await fetch(
        `${configuration.API.URL}:${configuration.API.PORT}/games/featured`,
      );
      const jsonRes = await res.json();
      this.setState({ failed: false, games: jsonRes });
    } catch (err) {
      // Show notification of failure
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

  renderMessage() {
    const { failed, message } = this.state;

    return failed ? <div className="text-center error">{message}</div> : <></>;
  }

  render() {
    return (
      <>
        {this.renderNotification()}
        {this.renderMessage()}
        <div className="Home pure-g center">
          <h2 className="pure-u-4-5 text-left">Featured Games</h2>
          {this.renderGames()}
        </div>
      </>
    );
  }
}

Home.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      failed: PropTypes.bool,
      message: PropTypes.string,
    }),
  }),
};

Home.defaultProps = {
  location: { state: { failed: false, message: '' } },
};

export default Home;
