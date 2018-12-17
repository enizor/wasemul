import React from 'react';
import PropTypes from 'prop-types';

const Game = (props) => {
  const { id, name, publisher, releaseDate } = props;
  return (
    <a className="pure-button pure-u-3-5" href={`/games/${id}`}>
      <div className="Game">
        <div className="pure-u-1-5">
          <img src="https://people.via.ecp.fr/~atauveron/img/logo_VIA.jpg" height="128" alt="VIA Centrale Réseaux" />
        </div>
        <div className="pure-u-4-5">
          <h3>{`${id}: ${name}`}</h3>
          <h4>{`${publisher} (${releaseDate})`}</h4>
        </div>
      </div>
    </a >
  );
};

Game.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
};

export default Game;
