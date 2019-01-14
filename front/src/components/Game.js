import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

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
    };
  }

  componentDidMount = () => {
    this.fetchGameInfos();
    this.fetchComments();
  };

  fetchGameInfos = () => {
    const { match } = this.props;

    // API call this.state.id
    fetch(
      `https://${document.location.hostname}:3001/games/${match.params.id}`,
      myInit,
    )
      .then(res => res.json())
      .then((json) => {
        this.setState({
          gameInfo: json,
        });
      });
  };

  fetchComments = () => {
    const { match } = this.props;

    fetch(
      `https://${document.location.hostname}:3001/games/${
        match.params.id
      }/comments`,
      myInit,
    )
      .then(res => res.json())
      .then((json) => {
        this.setState({
          comments: json,
        });
      });
  };

  render() {
    const { match } = this.props;
    const { gameInfo, comments } = this.state;

    if (parseInt(match.params.id, 10) === undefined) return <Redirect to="/" />;
    return (
      <div>
        <div>
          <h1>Game Description</h1>
          <img src={gameInfo.icon} alt="" />
          {' '}
          {gameInfo.name}
          <br />
          Platform:
          {' '}
          {gameInfo.platform}
          <br />
          Description:
          {' '}
          {gameInfo.description}
          <br />
          Released:
          {' '}
          {gameInfo.releaseDate}
          <br />
          Published by:
          {' '}
          {gameInfo.publisher}
        </div>
        <br />
        <div>
          <h1>Comments</h1>
          <hr />
          {comments.map(comment => (
            <div key={comment.id}>
              <p>{comment.body}</p>
              <p>Sent by: </p>
              <Link to={`/users/${comment.userId}`}>
                {comment.User.nickname}
              </Link>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }),
};

Game.defaultProps = {
  match: { params: { id: 0 } },
};

export default Game;
