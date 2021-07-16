import React from 'react';
import { useMutation } from '@apollo/client';
import UpdateContainerUser from '../../server/graphql/mutations/UpdateContainerUser.graphql';
import DeleteContainerUser from '../../server/graphql/mutations/DeleteContainerUser.graphql';
import ContainerQuery from '../../server/graphql/queries/Container.graphql';
import ContainerItems from '../../server/graphql/queries/ContainerItems.graphql';
import { Button, ButtonGroup, Typography } from '@material-ui/core';

const PendingUsers = (props) => {
  const { users, containerId } = props;

  // WHERE I AM AT—ADD useMutation HERE (FOLLOW ITEMCARD FOR PRECEDENT)
  const [updateContainerUser] = useMutation(UpdateContainerUser);
  const [deleteContainerUser] = useMutation(DeleteContainerUser, {
    refetchQueries: [
      {
        query: ContainerQuery,
        variables: {
          id: containerId,
        },
      },
      {
        query: ContainerItems,
        variables: {
          containerId: containerId,
        },
      },
    ],
  });

  if (users.length === 0) {
    return '';
  }

  const handleAccept = (id) => {
    updateContainerUser({
      variables: {
        id: id,
        input: 'user',
      },
    });
  };

  const handleReject = (id) => {
    deleteContainerUser({
      variables: {
        id: id,
      },
    });
  };

  return (
    <div>
      <h3>Users pending invite acceptance:</h3>
      <div>
        {users.map((user, idx) => {
          return (
            <div key={idx}>
              <Typography>
                {user.firstName} {user.lastName}
              </Typography>
              <ButtonGroup>
                <Button onClick={() => handleAccept(user.containerUser.id)}>
                  Accept
                </Button>
                <Button onClick={() => handleReject(user.containerUser.id)}>
                  Reject
                </Button>
              </ButtonGroup>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PendingUsers;
