import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { query: '' };
  }

  updateQuery = (e) => {
    this.setState({ query: e.target.value });
  };

  executeSearch = () => {
    const { query } = this.state;

    console.log(query);
  };

  render = () => (
    <div>
      <input
        type="text"
        onChange={this.updateQuery}
        placeholder="Type Here..."
      />
      <button type="submit" onClick={this.executeSearch}>
        Search
      </button>
    </div>
  );
}
