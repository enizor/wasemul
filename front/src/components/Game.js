import React from 'react';
import PropTypes from 'prop-types';

const Game = (props) => {
  const { id, name } = props;
  return (
    <a className="pure-button pure-u-3-5" href={`/games/${id}`}>
      <div className="Game">
        <h3>{`${id}: ${name}`}</h3>
      </div>
    </a>
  );
};

Game.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Game;
