import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { spacing } from '@material-ui/system';

import AddItemCard from './AddItemCard';

export default function AddItemCardGrid(props) {
  const { classes, containerItems } = props;
  return (
    <Container className={classes.cardGrid} maxWidth='xl'>
      <Grid mx='auto' container spacing={6}>
        {containerItems.map((item) => {
          return <AddItemCard item={item} key={item.id} classes={classes} />;
        })}
      </Grid>
    </Container>
  );
}
