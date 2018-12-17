import React from 'react';

class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/games')
      .then(res => res.json())
      .then((result) => {
        this.setState({ games: result });
      });
  }

  render() {
    const { games } = this.state;

    return (

      <div>
        {games.map(game => (
          <a
            key={game.id}
            className="pure-button pure-u-3-5"
            href={`/games/${game.id}`}
          >
            <div className="Game">
              <h3>{`${game.id}: ${game.name}`}</h3>
            </div>
          </a>
        ))}
      </div>
    );
  }
}

export default GameList;
