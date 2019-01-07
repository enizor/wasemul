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
    console.log(this.state.query);
  };

  render = () => (
    <div>
      <input
        type="text"
        onChange={this.updateQuery}
        placeholder="Type Here..."
      />
      <button onClick={this.executeSearch}>Search</button>
    </div>
  );
}
