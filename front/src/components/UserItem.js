import React from 'react';
import PropTypes from 'prop-types';

const UserItem = (props) => {
  // Component for a user item in a games list
  const { id, nickname, icon } = props;
  const iconPath = icon;
  return (
    <a className="pure-button pure-u-3-5" href={`/users/${id}`}>
      <div className="User">
        <div className="pure-u-1-5">
          <img src={iconPath} height="128" alt={nickname} />
        </div>
        <div className="pure-u-4-5">
          <h3>{`${nickname}`}</h3>
        </div>
      </div>
    </a>
  );
};

UserItem.propTypes = {
  id: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default UserItem;
