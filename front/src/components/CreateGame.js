import React from 'react';
import { Redirect } from 'react-router-dom';
import Auth from './AuthService';
import '../css/Game.css';

const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');

class CreateGame extends React.Component {
  // Form to create a new game

  constructor(props) {
    super(props);

    this.state = {
      failed: false,
      redirect: false,
      message: '',

      game: {
        id: undefined,
        name: '',
        platform: '',
        description: '',
        releaseDate: '',
        publisher: '',
      },
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    const { game } = this.state;
    this.setState({
      game: Object.assign(game, { [name]: value }),
    });
  };

  handleSubmit = (event) => {
    const { game } = this.state;
    (async () => {
      try {
        // Try to POST the new game
        const newGame = await Auth.fetch(
          `${configuration.API.URL}:${configuration.API.PORT}/games`,
          {
            method: 'POST',
            body: JSON.stringify({ game }),
            mode: 'cors',
            cache: 'default',
          },
        );
        // Creation successful, go to the game's page
        this.setState({
          game: { id: newGame.id },
          redirect: true,
          message: 'Game successfully created!',
        });
      } catch (err) {
        // Creation failed, show notification and go back to games page
        this.setState({ failed: true, message: 'Failed to create game.' });
      }
    })();
    event.preventDefault();
  };

  render() {
    const {
      game, failed, message, redirect,
    } = this.state;

    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: `/games/${game.id}`,
            state: { failed, message },
          }}
        />
      );
    }

    return failed ? (
      <Redirect
        to={{
          pathname: '/games',
          state: { failed, message },
        }}
      />
    ) : (
      <div className="center">
        <form
          onSubmit={this.handleSubmit}
          className="pure-form pure-form-aligned EditGame"
        >
          <fieldset>
            <legend className="pure-u-1">Add a new game</legend>
            <div className="pure-control-group">
              <label htmlFor="name" className="pure-u-1-3">
                Name
              </label>
              <input
                className="pure-input-2-3"
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                value={game.name}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="pure-control-group">
              <label htmlFor="platform" className="pure-u-1-3">
                Platform
              </label>
              <input
                className="pure-input-2-3"
                id="platform"
                type="text"
                name="platform"
                placeholder="Platform"
                value={game.platform}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="pure-control-group">
              <label htmlFor="description" className="pure-u-1-3">
                Description
              </label>
              <textarea
                id="description"
                className="pure-input-2-3"
                name="description"
                placeholder="Description"
                value={game.description}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="pure-control-group">
              <label htmlFor="publisher" className="pure-u-1-3">
                Publisher
              </label>
              <input
                className="pure-input-2-3"
                id="publisher"
                type="text"
                name="publisher"
                placeholder="Publisher"
                value={game.publisher}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="pure-controls">
              <button
                type="submit"
                className="pure-button pure-button-primary"
                onClick={this.handleSubmit}
              >
                Add
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default CreateGame;
