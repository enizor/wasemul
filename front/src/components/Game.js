import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import NewSave from './NewSave';
import NewComment from './NewComment';
import Auth from './AuthService';
import '../css/Game.css';

const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');
/**
 * Fetch configuration through
 */
const myHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
});

const myInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default',
};

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameInfo: {},
      comments: [],
      saves: [],
      editable: false,
    };
  }

  componentDidMount = () => {
    this.fetchGameData();
    this.fetchComments();
    this.fetchSaves();
  };

  fetchGameData = async () => {
    const { match } = this.props;

    // API call this.state.id
    const res = await fetch(
      `${configuration.API.URL}:${configuration.API.PORT}/games/${
        match.params.id
      }`,
      myInit,
    );
    const jsonRes = await res.json();

    let editable = false;
    if (Auth.loggedIn()) {
      const profile = Auth.getProfile();
      editable = profile.authLevel !== 2;
    }
    this.setState({
      gameInfo: jsonRes,
      editable,
    });
  };

  fetchComments = async () => {
    const { match } = this.props;

    const res = await fetch(
      `${configuration.API.URL}:${configuration.API.PORT}/games/${
        match.params.id
      }/comments`,
      myInit,
    );
    const jsonRes = await res.json();
    this.setState({
      comments: jsonRes,
    });
  };

  fetchSaves = async () => {
    const { match } = this.props;

    const res = await fetch(
      `${configuration.API.URL}:${configuration.API.PORT}/games/${
        match.params.id
      }/saves`,
      myInit,
    );
    const jsonRes = await res.json();
    this.setState({
      saves: jsonRes,
    });
  };

  renderComments() {
    const { comments } = this.state;

    if (comments.length === 0) {
      return <div>No comments here :(</div>;
    }

    return comments.map(comment => (
      <div key={comment.id}>
        <p>{comment.body}</p>
        <div className="italic">
          {'by '}
          <Link to={`/users/${comment.userId}`}>{comment.User.nickname}</Link>
          {` (${new Date(comment.createdAt).toLocaleString()})̀`}
        </div>
        <hr />
      </div>
    ));
  }

  renderSaves() {
    const { saves } = this.state;

    if (saves.length === 0) {
      return <div>No saves here :(</div>;
    }

    return saves.map(save => (
      <div key={save.id}>
        <p>
          <a
            role="button"
            href={`${configuration.API.URL}:${
              configuration.API.PORT
            }/static/saves/${save.uploadTimestamp}-${save.file}`}
            download={`${save.file}`}
          >
            {save.file}
          </a>
        </p>

        <div className="italic">
          {'by '}
          <a href={`/users/${save.userId}`}>{save.User.nickname}</a>
          {` (uploaded ${new Date(save.createdAt).toLocaleDateString()})`}
        </div>
        <hr />
      </div>
    ));
  }

  render() {
    const { match } = this.props;
    const { gameInfo, editable } = this.state;

    if (parseInt(match.params.id, 10) === undefined) return <Redirect to="/" />;
    return (
      <div className="Game">
        <div className="pure-g center text-center align-items-center">
          <h3 className="pure-u-1">{gameInfo.name}</h3>
          <div className="pure-u-1-5">
            <img
              className="icon"
              src={
                gameInfo.icon
                // eslint-disable-next-line max-len
                || 'http://itibalasore.org/wp-content/uploads/2018/02/default-user-male.png'
              }
              alt="game pic"
            />
          </div>
          <div className="pure-u-3-5">
            <table className="pure-table pure-u-1">
              <tbody>
                <tr>
                  <td className="">Platform</td>
                  <td className="text-left">{gameInfo.platform}</td>
                </tr>
                {gameInfo.description != null && (
                  <tr>
                    <td className="">Description</td>
                    <td className="text-left">{gameInfo.description}</td>
                  </tr>
                )}
                <tr>
                  <td className="">Release date</td>
                  <td className="text-left">{gameInfo.releaseDate}</td>
                </tr>
                <tr>
                  <td className="">Publisher</td>
                  <td className="text-left">{gameInfo.publisher}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
        {editable && (
          <div className="pure-g center">
            <a className="pure-u-1-5" href={`/games/${gameInfo.id}/edit`}>
              <div className="pure-button pure-u-1 pure-button-primary">
                Edit
              </div>
            </a>
          </div>
        )}

        <div className="comment-section">
          <h2>Comments</h2>
          <NewComment
            gameID={match.params.id}
            fetchComments={this.fetchComments}
          />

          <legend>Last comments</legend>
          {this.renderComments()}
        </div>

        <div className="saves-section">
          <h2>Saves</h2>
          <NewSave gameID={match.params.id} fetchSaves={this.fetchSaves} />

          <legend>Last saves</legend>
          {this.renderSaves()}
        </div>

      </div>
    );
  }
}

Game.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

Game.defaultProps = {
  match: { params: { id: 0 } },
};

export default Game;
