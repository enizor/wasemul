/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import Auth from './AuthService';

class SignUpForm extends React.Component {
  state = {
    nickname: '',
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
    const { nickname, email, password } = this.state;
    (async () => {
      try {
        await Auth.fetch('http://localhost:3001/register', {
          method: 'POST',
          body: JSON.stringify({
            nickname,
            email,
            password,
          }),
        });
        const { props: { history } } = this;
        history.push('/');
        console.log(Auth.getProfile());
      } catch (err) {
        alert('Error registering new user');
        console.log(err);
      }
    })();
    event.preventDefault();
  }

  render() {
    const { nickname, email, password } = this.state;
    return (
      <form className="pure-form pure-form-aligned authForm">
        <fieldset>
          <legend>
            Authentication
          </legend>

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
