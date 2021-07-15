import React from 'react';

const PendingUsers = (props) => {
  const { users } = props;

  if (users.length === 0) {
    return '';
  }

  return (
    <div>
      <h3>Users pending invite acceptance:</h3>
      <div>{users.map((user) => user.firstName)}</div>
    </div>
  );
};

export default PendingUsers;
