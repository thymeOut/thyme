import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { formatDistance } from 'date-fns';

export default function AddItemCard(props) {
  const { item, classes } = props;
  console.log(item.price)
  return (
    <Grid item key={item.id} xs={6} sm={4} md={2}>
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
          <Typography gutterBottom component='h3'>
            Quantity: {item.originalQuantity}
          </Typography>
          <Typography gutterBottom component='h3'>
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
          <Typography gutterBottom component='h3'>
            {item.price ? (
              <>
                Price per Item: {'$'}
                {(item.price/ 100).toFixed(2)}
              </>
            ):<></>}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
