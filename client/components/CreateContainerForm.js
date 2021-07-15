import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EmailForm from './EmailForm';
import AddUserToContainer from '../../server/graphql/mutations/AddUserToContainer.graphql';
import Alert from '@material-ui/lab/Alert';
import { createContainerErrorHandler } from './ErrorHandlers';

const CREATE_CONTAINER = gql`
  mutation CreateContainer($name: String!, $type: ContainerType!) {
    createContainer(name: $name, type: $type) {
      id
      name
      type
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '25ch',
    },
  },
}));

const ContainerForm = (props) => {
  const classes = useStyles();
  const [containerName, setContainerName] = useState('');
  const [containerType, setContainerType] = useState('fridge');
  const [addedUsers, setAddedUsers] = useState([]);
  const [errors, setErrors] = useState('no');

  const [createContainer, { data, error, loading }] = useMutation(
    CREATE_CONTAINER,
    {
      onError: (data) => {},
      onCompleted: (data) => {
        if (addedUsers.length > 0) {
        } else {
          props.setCreateToggle(false);
        }
      },
      refetchQueries: [
        {
          query: props.GET_CONTAINERS,
          variables: {
            id: localStorage.getItem('user-id'),
          },
        },
      ],
    }
  );

  const [addUserToContainer, { data: addUserData, error: addUserError }] =
    useMutation(AddUserToContainer, {
      onError: (data) => {
        if (addedUsers[0].length === 0) {
          props.setCreateToggle(false);
        }
      },
      onCompleted: (data) => {
        props.setCreateToggle(false);
      },
    });

  const handleContainerSubmit = (e) => {
    e.preventDefault();
    createContainer({
      variables: {
        name: containerName,
        type: containerType,
      },
      update: (_, mutationResult) => {
        addedUsers.map((email) => {
          return addUserToContainer({
            variables: {
              input: {
                email: email,
                role: 'user',
              },
              containerId: +mutationResult.data.createContainer.id,
            },
          });
        });
      },
    });
  };

  let errorType;
  if (error) {
    errorType = error;
  } else {
    errorType = addUserError;
  }

  console.log(addedUsers)

  useEffect(() => {}, [addedUsers]);
  return (
    <form onSubmit={handleContainerSubmit} className={classes.root}>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='flex-start'
      >
        <TextField
          id='container-type'
          select
          label='Select'
          value={containerType}
          onChange={(e) => {
            setContainerType(e.target.value);
          }}
          helperText='Container Type'
          variant='filled'
        >
          <MenuItem value='fridge'>Fridge</MenuItem>
          <MenuItem value='freezer'>Freezer</MenuItem>
          <MenuItem value='pantry'>Pantry</MenuItem>
          <MenuItem value='minifridge'>Mini-fridge</MenuItem>
        </TextField>
        <TextField
          value={containerName}
          required
          variant='filled'
          id='standard-required'
          label='Name Your Container'
          onChange={(e) => setContainerName(e.target.value)}
        />
        <div className='form-title'>Invite Users:</div>
        <EmailForm setAddedUsers={setAddedUsers} addedUsers={addedUsers} />
      </Grid>
      <DialogActions>
        <Button onClick={() => props.setCreateToggle(false)} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={(e) => {
            handleContainerSubmit(e);
          }}
          color='primary'
        >
          Create
        </Button>
      </DialogActions>
      {error || addUserError ? (
        <Alert severity='error'>
          {' '}
          {createContainerErrorHandler(errorType)}
        </Alert>
      ) : (
        <div></div>
      )}
    </form>
  );
};

export default ContainerForm;
