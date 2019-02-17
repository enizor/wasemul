import React from 'react';
import Auth from './AuthService';
import '../css/Auth.css';

class AuthForm extends React.Component {
  // Login form
  constructor(props) {
    super(props);

    this.state = {
      failed: false,
      message: '',

      email: '',
      password: '',
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
    const { email, password } = this.state;

    (async () => {
      try {
        await Auth.login(email, password);

        // eslint-disable-next-line react/prop-types
        const { props: { history } } = this;
        // Go to main page
        history.push('/');
      } catch (err) {
        // Failure: show notification
        this.setState({
          failed: true,
          message: 'Username and password do not match.',
        });
      }
    })();
    event.preventDefault();
  }

  renderMessage() {
    // Render a notification
    const { failed, message } = this.state;

    return failed
      ? <div className="text-center error">{message}</div>
      : <></>;
  }

  render() {
    const { email, password } = this.state;
    return (
      <form className="pure-form pure-form-aligned AuthForm">
        <fieldset>
          <legend>
            Authentication
          </legend>

          <div className="pure-control-group center">
            <label htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
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

          {this.renderMessage()}

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
