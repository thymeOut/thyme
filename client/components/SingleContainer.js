import React from 'react';
import { useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';
import ContainerQuery from '../../server/graphql/queries/Container.graphql';
import ContainerItems from '../../server/graphql/queries/ContainerItems.graphql';
import PendingUsers from './PendingUsers';

import { Button, Grid, Typography, Container } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import ItemCardGrid from './ItemCardGrid';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function SingleContainer(props) {
  const containerId = props.match.params.id;
  const classes = useStyles();

  const {
    loading: itemLoading,
    error: itemError,
    data: itemData,
  } = useQuery(ContainerQuery, {
    variables: {
      id: containerId,
    },
  });

  const {
    loading: containerItemLoading,
    error: containerItemError,
    data: containerItemData,
  } = useQuery(ContainerItems, {
    variables: {
      containerId: containerId,
    },
  });

  if (itemLoading || containerItemLoading) {
    return '...loading';
  }

  if (itemError || containerItemError) {
    return '...error';
  }

  const { container } = itemData;

  const containerItems = containerItemData.containerItems.map((cItem) => {
    let item = container.items.filter((item) => item.id === cItem.itemId)[0];

    return {
      id: cItem.id,
      itemId: item.id,
      userId: cItem.userId,
      containerId: cItem.containerId,
      name: item.name,
      imageUrl: item.imageUrl,
      containerItemImageUrl: cItem.imageUrl,
      originalQuantity: cItem.originalQuantity,
      quantityUsed: cItem.quantityUsed,
      expiration: cItem.expiration,
      itemStatus: cItem.itemStatus,
    };
  });

  const { name, users } = container;
  const pendingUsers = users.filter(user => user.containerUser.role === 'pending');

  return (
    <main>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {name}
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={{
                    pathname: `${container.id}/add`,
                    state: { containerId: container.id },
                  }}
                >
                  Add item
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to="/containers"
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </div>
          <div>
            {container.ownerId === localStorage.getItem('user-id')
              ? <PendingUsers users={pendingUsers} containerId={container.id} classes={classes} />
              : ''}
          </div>
        </Container>

        <ItemCardGrid
          classes={classes}
          containerItems={containerItems}
          users={users}
        />
      </div>
    </main>
  );
}
