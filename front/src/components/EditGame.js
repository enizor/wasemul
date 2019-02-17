import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Auth from './AuthService';
import '../css/Game.css';

const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');

class EditGame extends React.Component {
  // Form to edit an existing game

  constructor(props) {
    super(props);

    this.state = {
      failed: false,
      redirect: false,
      message: '',

      game: {
        id: props.match.params.id,
        name: '',
        platform: '',
        description: '',
        releaseDate: '',
        publisher: '',
      },
    };
  }

  componentDidMount = () => {
    this.fetchGameData();
  };

  fetchGameData = async () => {
    const { match } = this.props;
    try {
      // Try to GET current game data
      const res = await fetch(
        `${configuration.API.URL}:${configuration.API.PORT}/games/${
          match.params.id
        }`,
      );
      const jsonRes = await res.json();
      this.setState({ game: jsonRes, failed: false });
    } catch (err) {
      // Failure: show notification and go back to game page
      this.setState({
        failed: true,
        message: 'Failed to retrieve game data.',
      });
    }
  };

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
        // Try to PUT game data
        await Auth.fetch(
          `${configuration.API.URL}:${configuration.API.PORT}/games/${game.id}`,
          {
            method: 'PUT',
            body: JSON.stringify({ game }),
            mode: 'cors',
            cache: 'default',
          },
        );
        // Game updated ; go back to the game's page
        this.setState({
          redirect: true,
          message: 'Game successfully updated!',
        });
      } catch (err) {
        // Update failed ; go back to the game's page
        this.setState({
          failed: true,
          message: 'Failed to update game data.',
        });
      }
    })();
    event.preventDefault();
  };

  render() {
    const {
      game, failed, message, redirect,
    } = this.state;

    if (redirect || failed) {
      return (
        <Redirect
          to={{
            pathname: `/games/${game.id}`,
            state: { failed, message },
          }}
        />
      );
    }

    return (
      <div className="center">
        <form
          onSubmit={this.handleSubmit}
          className="pure-form pure-form-aligned EditGame"
        >
          <fieldset>
            <legend className="pure-u-1">{`Edit ${game.name} info`}</legend>
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
                Save
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

EditGame.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

EditGame.defaultProps = {
  match: { params: { id: 0 } },
};

export default EditGame;
