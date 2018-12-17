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

      <div className="pure-menu" style={{ display: 'inline-block' }}>
        <span className="pure-menu-heading">Featured Games</span>
        <ul className="pure-menu-list">
          {games.map(game => (
            <li key={game.id} className="pure-menu-item">
              <a
                className="pure-menu-link"
                href={`/games/${game.id}`}
              >
                <div className="Game">
                  <h3>{`${game.id}: ${game.name}`}</h3>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GameList;
