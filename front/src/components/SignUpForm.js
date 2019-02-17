/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import Auth from './AuthService';

const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');

class SignUpForm extends React.Component {
  // Form to register a new User

  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
      email: '',
      password: '',
      failed: false,
      message: '',
    };
  }

  handleInputChange = (event) => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    const { nickname, email, password } = this.state;
    (async () => {
      try {
        // Try to POST a new user
        const res = await Auth.fetch(
          `${configuration.API.URL}:${configuration.API.PORT}/register`, {
            method: 'POST',
            body: JSON.stringify({
              nickname,
              email,
              password,
            }),
          },
        );
        // Retrieve the token
        Auth.setToken(res.token);

        this.setState({ failed: false });

        // Go back to home page
        // eslint-disable-next-line react/prop-types
        const { props: { history } } = this;
        history.push('/');
      } catch (err) {
        // Show notification of failure
        this.setState({
          failed: true,
          message: 'Error while signing up this user.',
        });
      }
    })();
    event.preventDefault();
  }

  renderMessage() {
    const { failed, message } = this.state;

    return failed ? <div className="text-center error">{message}</div> : <></>;
  }

  render() {
    const { nickname, email, password } = this.state;
    return (
      <form className="pure-form pure-form-aligned authForm">
        <fieldset>
          <legend>
            Authentication
          </legend>

          {this.renderMessage()}
          <div className="pure-control-group center">
            <label htmlFor="name">
              Display name
            </label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              placeholder="Display name"
              value={nickname}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="pure-control-group center">
            <label htmlFor="name">
              E-mail address
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="pure-control-group">
            <label htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="pure-controls">
            <button
              type="submit"
              className="pure-button pure-button-primary"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default SignUpForm;
