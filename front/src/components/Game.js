import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import NewSave from './NewSave';
import NewComment from './NewComment';
import Notification from './Notification';
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
      failed: false,
      message: '',
      game: {},
      comments: [],
      commentsPage: 1,
      commentsPages: 1,
      saves: [],
      savesPage: 1,
      savesPages: 1,
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

    try {
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
        game: jsonRes,
        editable,
        failed: false,
      });
    } catch (err) {
      this.setState({
        failed: true,
        message: 'Failed to retreive game data.',
      });
    }
  };

  fetchComments = async () => {
    const { match } = this.props;
    const { location } = this.props;
    const query = new URLSearchParams(location.search).get('commentsPage') || 1;

    try {
      const res = await fetch(
        `${configuration.API.URL}:${configuration.API.PORT}/games/${
          match.params.id
        }/comments?page=${query}`,
        myInit,
      );
      const { comments, page, pages } = await res.json();
      this.setState({
        comments,
        commentsPage: page,
        commentsPages: pages,
      });
    } catch (err) {
      this.setState({
        comments: [],
        commentsPage: 1,
        commentsPages: 1,
      })
    }

  };

  fetchSaves = async () => {
    const { match } = this.props;
    const { location } = this.props;
    const query = new URLSearchParams(location.search).get('savesPage') || 1;

    try {
      const res = await fetch(
        `${configuration.API.URL}:${configuration.API.PORT}/games/${
          match.params.id
        }/saves?page=${query}`,
        myInit,
      );
      const { saves, page, pages } = await res.json();
      this.setState({
        saves,
        savesPage: page,
        savesPages: pages,
      });
    } catch (err) {
      this.setState({
        saves: [],
        savesPage: 1,
        savesPages: 1,
      });
    }

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

  renderCommentsPages() {
    const { location } = this.props;
    const { commentsPage, commentsPages } = this.state;
    const items = [];
    if (commentsPages > 1) {
      for (let number = 1; number <= commentsPages; number += 1) {
        const href = `${location.pathname}?commentsPage=${number}`;
        const active = number === parseInt(commentsPage, 10);
        items.push(
          // eslint-disable-next-line max-len
          <Pagination.Item key={number} active={active} href={href}>{number}</Pagination.Item>,
        );
      }
    }
    return items;
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

  renderNotification() {
    const { location } = this.props;
    if (location && location.state && location.state.message) {
      return (
        <Notification
          failed={location.state.failed}
          message={location.state.message}
        />
      );
    }
    return <></>;
  }
  renderSavesPages() {
    const { location } = this.props;
    const { savesPage, savesPages } = this.state;
    const items = [];
    if (savesPages > 1) {
      for (let number = 1; number <= savesPages; number += 1) {
        const href = `${location.pathname}?savesPage=${number}`;
        const active = number === parseInt(savesPage, 10);
        items.push(
          // eslint-disable-next-line max-len
          <Pagination.Item key={number} active={active} href={href}>{number}</Pagination.Item>,
        );
      }
    }
    return items;
  }

  render() {
    const { match } = this.props;
    const {
      game,
      editable,
      failed,
      message,
    } = this.state;

    return failed ? (
      <Redirect
        to={{
          pathname: '/',
          state: { failed, message },
        }}
      />
    ) : (
      <>
        {this.renderNotification()}
        <div className="Game">
          <div className="pure-g center text-center align-items-center">
            <h3 className="pure-u-1">{game.name}</h3>
            <div className="pure-u-1-5">
              <img
                className="icon"
                src={
                  game.icon
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
                    <td className="text-left">{game.platform}</td>
                  </tr>
                  {game.description != null && (
                    <tr>
                      <td className="">Description</td>
                      <td className="text-left">{game.description}</td>
                    </tr>
                  )}
                  <tr>
                    <td className="">Release date</td>
                    <td className="text-left">{game.releaseDate}</td>
                  </tr>
                  <tr>
                    <td className="">Publisher</td>
                    <td className="text-left">{game.publisher}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          {editable && (
            <div className="pure-g center">
              <a className="pure-u-1-5" href={`/games/${game.id}/edit`}>
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
            <div>
              <Pagination>{this.renderCommentsPages()}</Pagination>
            </div>
          </div>
          <div className="saves-section">
            <h2>Saves</h2>
            <NewSave gameID={match.params.id} fetchSaves={this.fetchSaves} />

            <legend>Last saves</legend>
            {this.renderSaves()}
            <div>
              <Pagination>{this.renderSavesPages()}</Pagination>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Game.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      failed: PropTypes.bool,
      message: PropTypes.string,
    }),
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }),
};

Game.defaultProps = {
  match: { params: { id: 0 } },
  location: { state: { failed: false, message: '' } },
};

export default Game;
