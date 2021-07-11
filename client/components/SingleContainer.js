import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Toolbar,
  Typography,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ItemCardGrid from './ItemCardGrid';

export const GET_CONTAINER = gql`
  query Container($id: ID!) {
    container(id: $id) {
      id
      name
      users {
        id
        firstName
        lastName
      }
      items {
        id
        name
        imageUrl
        containerItem {
          id
          userId
          originalQuantity
          quantityUsed
          expiration
        }
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
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
  const { loading, error, data } = useQuery(GET_CONTAINER, {
    variables: {
      id: containerId,
    },
  });
  if (loading) {
    return '...loading';
  }

  if (error) {
    return '...error';
  }
  
  const { container } = data;
  const { items, name, users } = container;

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
                  to={`${containerId}/add`}
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
        </Container>
        
        <ItemCardGrid classes={classes} items={items} users={users} />
      </div>
    </main>

  );
}
