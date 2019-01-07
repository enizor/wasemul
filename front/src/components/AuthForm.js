/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';

class AuthForm extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleInputChange = (event) => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    const { email, password } = this.state;
    (async () => {
      await fetch('http://localhost:3001/auth', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      // Do something with the resulting JWT
    })();
    event.preventDefault();
  }

  render() {
    const { email, password } = this.state;
    return (
      <form className="pure-form pure-form-aligned authForm">
        <fieldset>
          <legend>
            Authentication
          </legend>
          <div className="pure-control-group center">
            <label htmlFor="name">
              Username
            </label>
            <input
              id="name"
              name="email"
              type="text"
              placeholder="Username"
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

export default AuthForm;
