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
          <ItemCard item={item} classes={classes} users={users} />
        ))}
      </Grid>
    </Container>
  );
}
