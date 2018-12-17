import React from 'react';
import PropTypes from 'prop-types';

const Game = (props) => {
  const {
    id, name, publisher, releaseDate, icon,
  } = props;
  const iconPath = `http://localhost:3001/static/${icon}`;
  return (
    <a className="pure-button pure-u-3-5" href={`/games/${id}`}>
      <div className="Game">
        <div className="pure-u-1-5">
          <img src={iconPath} height="128" alt={`${name}`} />
        </div>
        <div className="pure-u-4-5">
          <h3>{`${id}: ${name}`}</h3>
          <h4>{`${publisher} (${releaseDate})`}</h4>
        </div>
      </div>
    </a>
  );
};

Game.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Game;
