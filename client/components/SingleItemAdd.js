import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import ContainerQuery from '../../server/graphql/queries/Container.graphql';
import ContainerItems from '../../server/graphql/queries/ContainerItems.graphql';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const GET_ITEM = gql`
	query Item($id: ID!) {
		item(id: $id) {
			name
		}
	}
`;

export const ADD_ITEM = gql`
	mutation AddItemToContainer(
		$containerId: ID!
		$itemId: ID!
		$originalQuantity: Int!
		$expiration: Date
		$itemStatus: ItemStatus!
	) {
		addItemToContainer(
			containerId: $containerId
			itemId: $itemId
			expiration: $expiration
			originalQuantity: $originalQuantity
			itemStatus: $itemStatus
		) {
			id
		}
	}
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SingleItemAdd(props) {
  const [quantity, setQuantity] = useState(1);
  const history = useHistory();
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_ITEM, {
    variables: {
      id: props.itemId,
    },
  });

  const [expiration, setExpiration] = useState(
    new Date(1606878000000).toISOString().slice(0, 10)
  );
  const [addItem, { error: addItemError }] = useMutation(ADD_ITEM, {
    variables: {
      containerId: props.containerId,
      itemId: props.itemId,
      originalQuantity: +quantity,
      itemStatus: 'ACTIVE',
      expiration: expiration,
    },
    refetchQueries: [
      {
        query: ContainerQuery,
        variables: {
          id: props.containerId,
        },
      },
      {
        query: ContainerItems,
        variables: {
          containerId: props.containerId,
        },
      },
    ],
  });

  if (loading) return '...loading';
  if (error) console.log(error);

  const handleChange = (event) => {
    if (event.target.name === 'quantity') {
      setQuantity(event.target.value);
    } else if (event.target.name === 'expiration') {
      setExpiration(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addItem();
    props.setAddToggle(false);
  };
  return (
    <Container className='singleItemAdd' maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Adding item
        </Typography>
        <Typography component='h1' variant='h6'>
          {data.item.name}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                id='date'
                label='Expiration'
                type='date'
                name='expiration'
                onChange={handleChange}
                defaultValue={expiration}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                id='text'
                label='Quantity'
                type='text'
                name='quantity'
                onChange={handleChange}
                defaultValue={quantity}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Done Adding
          </Button>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={() => props.setAddToggle(false)}
            className={classes.submit}
          >
            Cancel
          </Button>
        </form>
      </div>
    </Container>
  );

}
