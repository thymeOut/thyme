import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import ContainerForm from './CreateContainerForm';
import JoinContainer from './JoinContainer';
import EditContainerMenu from './EditContainerMenu';
import { makeStyles } from '@material-ui/core/styles';
import UserItemsQuery from '../../server/graphql/queries/UserItemsQuery.graphql';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import { formatDistance } from 'date-fns';

import {
  Select,
  Dialog,
  ButtonGroup,
  Button,
  Typography,
  CardMedia,
  CardHeader,
  CardActions,
  CardContent,
  Card,
  Container,
  Grid,
} from '@material-ui/core';
import EmailForm from './EmailForm';

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

export default function UserItems() {
  const classes = useStyles();

  const { loading, error, data } = useQuery(UserItemsQuery, {
    variables: {
      id: localStorage.getItem('user-id'),
    },
  });

  if (loading) {
    return '...loading';
  }
  if (error) {
    console.log(error);
    return '...error';
  }

  return (
    <Container className={classes.cardGrid} maxWidth='lg'>
      <Typography
        variant='h2'
        component='h2'
        style={{ marginBottom: '10px' }}
      >
        All of your Items
      </Typography>

      <Grid container spacing={4}>
        {data.user.containerItems.map((item, idx) => {
          return (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={item.item.imageUrl}
                  title={item.name}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {item.item.name}
                  </Typography>

                  <Typography>
                    {new Date(item.expiration).toISOString().slice(0, 16) <
                    new Date().toISOString().slice(0, 16) ? (
                      <>
                        Expired{' '}
                        {formatDistance(new Date(item.expiration), new Date(), {
                          addSuffix: true,
                        })}
                      </>
                    ) : (
                      <>
                        Expires{' '}
                        {formatDistance(new Date(item.expiration), new Date(), {
                          addSuffix: true,
                        })}
                      </>
                    )}
                  </Typography>
                  <Typography gutterBottom component='h4'>
                    Container:{' '}
                    <Link to={`/containers/${item.containerId}`}>
                      {
                        data.user.containers.find(
                          (container) => container.id === item.containerId
                        ).name
                      }
                    </Link>
                  </Typography>
                  <Typography gutterBottom component='h4'>
                    Remaining: {item.originalQuantity - item.quantityUsed}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
