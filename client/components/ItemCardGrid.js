import React from 'react';
import {
  Grid,
  Container,
} from '@material-ui/core';

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
