import React from 'react';
import { Link } from 'react-router-dom';

import {
  Form, FormGroup, FormControl, Button,
} from 'react-bootstrap';

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
      <Form inline>
        <FormGroup bsSize="small">
          <FormControl
            type="text"
            placeholder="Type here..."
            onChange={this.updateQuery}
          />
          <Link to={`/search/${query}`}>
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Link>
        </FormGroup>
      </Form>
    );
  };
}
