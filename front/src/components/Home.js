import React from 'react';
import GameItem from './GameItem';
import '../css/Home.css';

const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }

  componentDidMount = () => {
    this.fetchFeaturedGames();
  }

  fetchFeaturedGames = async () => {
    const res = await fetch(`${configuration.API.URL}:${
      configuration.API.PORT
    }/games/featured`);
    const jsonRes = await res.json();
    this.setState({ games: jsonRes });
  }

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

  render() {
    return (
      <div className="Home pure-g center">
        <h2 className="pure-u-4-5 text-left">Featured Games</h2>
        {this.renderGames()}
      </div>
    );
  }
}

export default Home;
