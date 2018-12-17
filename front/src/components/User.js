import React from 'react';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3001/users/${this.props.match.params.id}`)
      .then(res => res.json())
      .then((result) => {
        this.setState({ user: result });
      });
  }

  render() {
    return (
      <div className="App pure-g center">
        <h1 className="pure-u-3-5 text-left">OWO</h1>
        <p>{this.state.user.nickname}</p>
      </div>
    );
  }
}

export default User;
