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
    error: false,
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
        this.setState({ error: true });
      }
    })();
    event.preventDefault();
  };

  render() {
    const { fileInputKey } = this.state;
    return !Auth.loggedIn() ? null : (
      <div key={fileInputKey} className="center">
        <input type="file" name="" id="fileinput" onChange={this.handleSelectedFile} />
        <button type="button" onClick={this.handleUpload}>
          Upload
        </button>
      </div>
    );
  }
}

NewSave.propTypes = {
  gameID: PropTypes.number.isRequired,
  fetchSaves: PropTypes.func.isRequired,
};

export default NewSave;
