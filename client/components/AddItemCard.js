import React from 'react';
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
import { formatDistance } from 'date-fns';

export default function AddItemCard(props) {
  const { item, classes } = props;
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
            Expires On: {new Date(item.expiration).toISOString().slice(0, 10)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}