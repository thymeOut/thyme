import React from 'react';
import { Grid, Container } from '@material-ui/core';

import ItemCard from './ItemCard';

export default function ItemCardGrid(props) {
  const { classes, containerItems, users } = props;
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {containerItems.map((item, idx) => {
          if (item.itemStatus !== 'REMOVED') {
            return <ItemCard key={idx} item={item} classes={classes} users={users} />;
          } else {
            return <div key={idx}></div>
          }
        })}
      </Grid>
    </Container>
  );
}
