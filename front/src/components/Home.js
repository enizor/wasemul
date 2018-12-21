import React from 'react';
import GameItem from './GameItem';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/games/featured')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({ games: result });
        },
      );
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
        <h1 className="pure-u-3-5 text-left">Featured Games</h1>
        {this.renderGames()}
      </div>
    );
  }
}

export default Home;
