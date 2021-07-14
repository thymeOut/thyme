import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import SingleItemAdd from './SingleItemAdd';
import AddItemCardGrid from './AddItemCardGrid';
import ContainerQuery from '../../server/graphql/queries/Container.graphql';
import ContainerItems from '../../server/graphql/queries/ContainerItems.graphql';
import Items from '../../server/graphql/queries/Items.graphql';
import CreateItem from './CreateItem';
import { useHistory } from 'react-router';
import { Button, Typography, Container, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { Autocomplete } from '@material-ui/lab';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 0, 6),
    justifyContent: 'center',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
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

export default function AddItemToContainer(props) {
  const userId = localStorage.getItem('user-id');
  const containerId = props.match.params.id;
  const classes = useStyles();
  const history = useHistory();
  const [addToggle, setAddToggle] = useState(false);
  const [itemId, setItemId] = useState(0);
  const {
    loading: itemLoading,
    error: itemError,
    data: itemData,
  } = useQuery(Items);
  const {
    loading: containerLoading,
    error: containerError,
    data: containerData,
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

  if (itemLoading || containerLoading || containerItemLoading) {
    return '...loading';
  }

  if (itemError || containerError || containerItemError) {
    return '...error';
  }

  const { container } = containerData;

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

  const containerItemsFiltered = containerItems.filter((item) => {
    return item.userId === userId && item.itemStatus === 'ACTIVE';
  });

  return (
    <main>
      <Container
        style={{ justifyContent: 'center' }}
        className={classes.heroContent}
        maxWidth='xl'
      >
        <Button
          style={{ marginTop: '8px' }}
          variant='contained'
          color='primary'
          component={Link}
          to={{
            pathname: `/containers/${containerId}`,
          }}
        >
          <KeyboardArrowLeftIcon/> Back to Container View
        </Button>
        <Typography
          component='h3'
          variant='h6'
          align='center'
          color='textPrimary'
          gutterBottom
        >
          Choose one of these items
        </Typography>
        <Autocomplete
          id='combo-box-demo'
          options={itemData.items}
          getOptionLabel={(item) => item.name}
          style={{
            minHeight: '5vh',
            width: 300,
            margin: 'auto',
            border: '1px blue',
            padding: '10px',
          }}
          onChange={(event, value) => {
            if (value) {
              setAddToggle(true);
              setItemId(value.id);
            }
          }}
          renderInput={(params) => (
            <TextField {...params} label='items' variant='outlined' />
          )}
        />
        <Typography
          component='h3'
          variant='h6'
          align='center'
          color='textPrimary'
          gutterBottom
        >
          ....or create a new one!
        </Typography>
        <Button
          style={{ margin: '0 auto', display: 'flex', maxWidth: '150px' }}
          variant='contained'
          color='primary'
          component={Link}
          to={{
            pathname: `create`,
            state: { containerId: containerId },
          }}
        >
          Create
        </Button>
        {addToggle && (
          <Dialog open={addToggle}>
            <SingleItemAdd
              setAddToggle={setAddToggle}
              itemId={itemId}
              containerId={containerId}
            />
          </Dialog>
        )}
        <div>
          <div>
            <Typography
              component='h4'
              variant='h4'
              align='left'
              color='textPrimary'
              gutterBottom
              style={{ minHeight: '2vh' }}
            >
              Your Items in the Container
            </Typography>
            <AddItemCardGrid
              classes={classes}
              containerItems={containerItemsFiltered}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}
