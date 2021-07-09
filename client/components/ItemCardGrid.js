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

import ItemCard from './ItemCard';

export default function ItemCardGrid(props) {
  const { classes, items, users } = props;
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={item.imageUrl}
                title={item.name}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography>
                  {users.map((user) => {
                    if (user.id === item.containerItem.userId) {
                      return user.firstName;
                    }
                  })}
                </Typography>
                <Typography>
                  {item.containerItem.expiration
                    ? `Expiration: ${item.containerItem.expiration}`
                    : ''}
                </Typography>
              </CardContent>
              <CardActions>
                <ButtonGroup size="small" color="primary">
                  <Button>-</Button>
                  <Button>
                    {item.containerItem.originalQuantity -
                      item.containerItem.quantityUsed}
                  </Button>
                  <Button>+</Button>
                </ButtonGroup>
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="primary">
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
