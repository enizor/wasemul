import React from 'react';
import PropTypes from 'prop-types';

const GameItem = (props) => {
  const {
    id, name, publisher, releaseDate, icon,
  } = props;

  const iconPath = icon;

  return (
    <a className="pure-button pure-u-4-5" href={`/games/${id}`}>
      <div className="GameItem">
        <div className="pure-u-1-5">
          <img src={iconPath} height="128" alt={name} />
        </div>
        <div className="pure-u-4-5">
          <h4>{`${name}`}</h4>
          <h5>{`${publisher} (${releaseDate})`}</h5>
        </div>
      </div>
    </a>
  );
};

GameItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default GameItem;
