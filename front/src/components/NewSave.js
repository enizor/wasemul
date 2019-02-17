import React from 'react';
import PropTypes from 'prop-types';

import Auth from './AuthService';

const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');

class NewSave extends React.Component {
  state = {
    file: null,
    fileInputKey: Date.now(),
  };

  handleSelectedFile = (event) => {
    console.log(event.target.files[0]);
    this.setState({
      file: event.target.files[0],
    });
  };

  handleUpload = (event) => {
    event.persist();
    const { gameID, fetchSaves } = this.props;
    const { file } = this.state;
    const data = new FormData();
    (async () => {
      try {
        data.append('file', file, file.name);
        await Auth.upload(
          `${configuration.API.URL}:${
            configuration.API.PORT
          }/games/${gameID}/saves`,
          {
            method: 'POST',
            body: data,
            mode: 'cors',
            cache: 'default',
          },
        );
        this.setState({
          fileInputKey: (new Date()),
          file: null,
        });
        fetchSaves();
      } catch (err) {
        console.log(err);
      }
    })();
    event.preventDefault();
  };

  render() {
    const { fileInputKey } = this.state;
    return !Auth.loggedIn() ? null : (
      <form key={fileInputKey} className="pure-form NewComment">
        <fieldset className="pure-group">
          <legend className="pure-u-1">
            Add a save
          </legend>
          <input
            type="file"
            onChange={this.handleSelectedFile}
          />
          <button
            className="pure-button pure-button-primary"
            type="button"
            onClick={this.handleUpload}
          >
            Upload
          </button>
        </fieldset>
      </form>
    );
  }
}

NewSave.propTypes = {
  gameID: PropTypes.string.isRequired,
  fetchSaves: PropTypes.func.isRequired,
};

export default NewSave;
