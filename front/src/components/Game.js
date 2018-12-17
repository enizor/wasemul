import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

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
    fetch(`http://localhost:3001/games/${match.params.id}`, myInit)
      .then(res => res.json())
      .then((json) => {
        this.setState({
          gameInfo: json,
        });
      });
  };

  fetchComments = () => {
    const { match } = this.props;

    fetch(`http://localhost:3001/games/${match.params.id}/comments`, myInit)
      .then(res => res.json())
      .then((json) => {
        this.setState({
          comments: json,
        });
      });
  };

  render() {
    console.log(this.state);
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
        </div>
        <br />
        <div>
          <h1>Comments</h1>
          <hr />
          {comments.map(comment => (
            <div key={comment.id}>
              <p>{comment.body}</p>
              <p>Sent by: </p>
              <p>{comment.User.nickname}</p>
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
      id: PropTypes.string.isRequired,
    }),
  }),
};

Game.defaultProps = {
  match: { params: { id: '' } },
};

export default Game;
