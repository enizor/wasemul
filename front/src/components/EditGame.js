import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Auth from './AuthService';
import './Game.css';

const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');

class EditGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      failed: false,
      game: {
        id: props.match.params.id,
        name: '',
        platform: '',
        description: '',
        releaseDate: '',
        publisher: '',
      },
      redirect: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    fetch(`${configuration.API.URL}:${configuration.API.PORT}/games/${
      match.params.id
    }`)
      .then(res => res.json())
      .then((result) => {
        this.setState({ game: result, failed: false });
      })
      .catch(() => {
        this.setState({ failed: true });
      });
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
        await Auth.fetch(`${configuration.API.URL}:${
          configuration.API.PORT
        }/games/${game.id}`, {
          method: 'PUT',
          body: JSON.stringify({ game }),
          mode: 'cors',
          cache: 'default',
        });
        this.setState({ redirect: true });
      } catch (err) {
        this.setState({ failed: true });
      }
    })();
    event.preventDefault();
  };

  //   {
  //     "id": 1,
  //     "nickname": "test",
  //     "email": "test@example.com",
  //     "authLevel": 0,
  //     "biography": null,
  //     "icon": null,
  //     "enabled": null,
  //     "createdAt": "2018-12-10T15:03:34.773Z",
  //     "updatedAt": "2018-12-10T15:03:34.773Z"
  //     }
  render() {
    const { game, failed, redirect } = this.state;

    if (redirect === true) {
      return <Redirect to={`/games/${game.id}`} />;
    }

    return failed ? (
      <Redirect to="/" />
    ) : (
      <div className="center">
        <form
          onSubmit={this.handleSubmit}
          className="pure-form pure-form-aligned EditGame"
        >
          <fieldset>
            <legend className="pure-u-1">
              {`Edit ${game.name} info`}
            </legend>
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
