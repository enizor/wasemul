/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import Auth from './AuthService';

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
      try {
        await Auth.login(email, password);
        // eslint-disable-next-line react/prop-types
        const { props: { history } } = this;
        history.push('/');
        console.log(Auth.getProfile());
      } catch (err) {
        alert('The username and password does not match');
      }
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
