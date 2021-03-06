import React from 'react';
import PropTypes from 'prop-types';

import Auth from './AuthService';

const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');

class NewSave extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      fileInputKey: Date.now(),
      failed: false,
      message: '',
    };
  }

  handleSelectedFile = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  };

  handleUpload = (event) => {
    const { gameID, fetchSaves } = this.props;
    const { file } = this.state;
    const data = new FormData();

    if (file === null) {
      return;
    }

    (async () => {
      try {
        data.append('file', file, file.name);
        // Upload the file
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
          // Regenerate an input key so that the input field is cleared of the previous file
          fileInputKey: (new Date()),
          file: null,
          failed: false,
        });

        fetchSaves();
      } catch (err) {
        // Show notification of failure
        this.setState({
          failed: true,
          message: 'Failed to add save.',
        });
      }
    })();
    event.preventDefault();
  };

  renderMessage() {
    const { failed, message } = this.state;

    return failed ? <div className="error">{message}</div> : <></>;
  }

  render() {
    const { fileInputKey, file } = this.state;

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

          {this.renderMessage()}

          <button
            className="pure-button pure-button-primary"
            type="button"
            onClick={this.handleUpload}
            disabled={file === null}
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
