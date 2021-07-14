import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router';
import ContainerQuery from '../../server/graphql/queries/Container.graphql';
import ContainerItems from '../../server/graphql/queries/ContainerItems.graphql';
import UpdateContainerItem from '../../server/graphql/mutations/UpdateContainerItem.graphql';

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

export default function EditItem(props) {
  const history = useHistory();
  const classes = useStyles();
  const { item, users, containerId } = props.location.state;

  const [expiration, setExpiration] = useState(
    new Date(item.expiration).toISOString().slice(0, 10)
  );
  const [imageUrl, setImageUrl] = useState(item.imageUrl);
  const [ownerId, setOwnerId] = useState(item.userId);

  const handleChange = (event) => {
    if (event.target.name === 'owner') {
      setOwnerId(event.target.value);
    } else if (event.target.name === 'expiration') {
      setExpiration(event.target.value);
    }
  };

  const [submitUpdate] = useMutation(UpdateContainerItem, {
    variables: {
      id: item.id,
      input: {
        expiration: new Date(expiration),
        imageUrl: imageUrl,
        userId: ownerId,
      },
    },
    refetchQueries: [
      {
        query: ContainerQuery,
        variables: {
          id: containerId,
        },
      },
      {
        query: ContainerItems,
        variables: {
          containerId: containerId,
        },
      },
    ],
    onCompleted: (submitUpdate) => {
      history.push(`/containers/${containerId}`);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    submitUpdate();
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit item
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                id="date"
                label="Expiration"
                type="date"
                name="expiration"
                onChange={handleChange}
                defaultValue={expiration}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button variant="contained" component="label">
                change image
                <input type="file" hidden />
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Select
                id="select"
                label="Owner"
                name="owner"
                value={ownerId}
                onChange={handleChange}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.firstName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Done editing
          </Button>
        </form>
      </div>
    </Container>
  );
}
