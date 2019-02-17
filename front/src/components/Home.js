import React from 'react';
import GameItem from './GameItem';
import './Home.css';

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

  componentDidMount() {
    fetch(`${configuration.API.URL}:${configuration.API.PORT}/games/featured`)
      .then(res => res.json())
      .then((result) => {
        this.setState({ games: result });
      });
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
      <div className="App pure-g center">
        <h2 className="pure-u-3-5 text-left">Featured Games</h2>
        {this.renderGames()}
      </div>
    );
  }
}

export default Home;
