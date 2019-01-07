import React from 'react';
import { Link } from 'react-router-dom';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { query: '' };
  }

  updateQuery = (e) => {
    this.setState({ query: e.target.value });
  };

  render = () => {
    const { query } = this.state;
    return (
      <div style={{ float: 'right' }}>
        <input
          type="text"
          onChange={this.updateQuery}
          placeholder="Type Here..."
        />
        <Link to={`/search/${query}`}>
          <button type="submit">Search</button>
        </Link>
      </div>
    );
  };
}
