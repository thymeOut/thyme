import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { formatDistance } from 'date-fns';
import ContainerQuery from '../../server/graphql/queries/Container.graphql';
import ContainerItems from '../../server/graphql/queries/ContainerItems.graphql';
import UpdateContainerItem from '../../server/graphql/mutations/UpdateContainerItem.graphql';

function ItemCard(props) {
  const localId = window.localStorage.getItem('user-id');
  const containerId = props.match.params.id;
  const { item, classes, users } = props;
  const formattedExpiration = item.expiration
    ? formatDistance(new Date(item.expiration), new Date(), {
        addSuffix: true,
      })
    : '';

  const [quantityUsed, setQuantityUsed] = useState(item.quantityUsed);

  const [updateQuantity] = useMutation(UpdateContainerItem, {
    variables: {
      id: item.id,
      input: {
        quantityUsed: quantityUsed,
      },
    },
  });

  const [removeItem] = useMutation(UpdateContainerItem, {
    variables: {
      id: item.id,
      input: {
        itemStatus: 'REMOVED',
      },
    },
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

  const handleDecrement = () => {
    setQuantityUsed(quantityUsed + 1);

    if (quantityUsed === item.originalQuantity - 1) {
      handleRemove();
    } else {
      updateQuantity({
        variables: {
          id: item.id,
          input: {
            quantityUsed: quantityUsed + 1,
          },
        },
      });
    }
  };

  const handleIncrement = () => {
    setQuantityUsed(quantityUsed - 1);
    updateQuantity({
      variables: {
        id: item.id,
        input: {
          quantityUsed: quantityUsed - 1,
        },
      },
    });
  };

  const handleRemove = () => {
    removeItem();
  };

  return (
    <Grid item key={item.id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={item.imageUrl}
          title={item.name}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant='h5' component='h2'>
            {item.name}
          </Typography>
          <Typography>
            {users.map((user) => {
              if (user.id === item.userId) {
                return user.firstName;
              } else {
                return '';
              }
            })}
          </Typography>
          <Typography>
            {new Date(item.expiration).toISOString().slice(0, 16) <
            new Date().toISOString().slice(0, 16) ? (
              <p>
                Expired:
                {formatDistance(new Date(item.expiration), new Date(), {
                  addSuffix: true,
                })}
              </p>
            ) : (
              <p>
                Expires:
                {formatDistance(new Date(item.expiration), new Date(), {
                  addSuffix: true,
                })}
              </p>
            )}
          </Typography>
        </CardContent>
        {localId === item.userId && (
          <CardActions>
            <ButtonGroup size='small' color='primary'>
              <Button onClick={handleDecrement}>-</Button>
              <Button>{item.originalQuantity - item.quantityUsed}</Button>
              <Button onClick={handleIncrement}>+</Button>
            </ButtonGroup>
            <Button
              size='small'
              color='primary'
              component={Link}
              to={{
                pathname: `${containerId}/edititem/${item.id}`,
                state: { item: item, users: users, containerId: containerId },
              }}
            >
              Edit
            </Button>
            <Button size='small' color='primary' onClick={handleRemove}>
              Remove
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}

export default withRouter(ItemCard);
