import React from 'react';
import './App.css';
import Game from './components/Game';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/games')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({ games: result });
        },
      );
  }

  renderGames() {
    const { games } = this.state;
    return games.map(e => <Game key={e.id} id={e.id} name={e.name} publisher={e.publisher} releaseDate={e.releaseDate}/>);
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

export default App;
