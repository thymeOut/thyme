import React from 'react';
import { useMutation } from '@apollo/client';
import UpdateContainerUser from '../../server/graphql/mutations/UpdateContainerUser.graphql';
import DeleteContainerUser from '../../server/graphql/mutations/DeleteContainerUser.graphql';
import ContainerQuery from '../../server/graphql/queries/Container.graphql';
import ContainerItems from '../../server/graphql/queries/ContainerItems.graphql';
import { Button, ButtonGroup, Typography, Container } from '@material-ui/core';

const PendingUsers = (props) => {
  const { users, containerId, classes } = props;

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
    <Container
      maxWidth="sm"
    >
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="textPrimary"
        gutterBottom
        style={{ paddingTop: '30px' }}
      >
        Users waiting to join:
      </Typography>

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
    </Container>
  );
};

export default PendingUsers;
