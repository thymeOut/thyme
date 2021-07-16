import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { UserContext } from '../UserContext';
import { registerErrorHandler } from './ErrorHandlers';
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const SIGNUP_MUTATION = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    createUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      token
      user {
        id
      }
    }
  }
`;

function RegisterForm() {
  const { isLoggedIn, setLoggedIn } = useContext(UserContext);
  const history = useHistory();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [signup, { error }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      firstName: formState.firstName,
      lastName: formState.lastName,
      email: formState.email,
      password: formState.password,
    },
    onCompleted: (data) => {
      localStorage.setItem('token', data.createUser.token);
      localStorage.setItem('user-id', data.createUser.user.id);
      setLoggedIn(true);
      history.push('/');
    },
  });

  const handleRegister = (e) => {
    e.preventDefault();
    signup();
  };

  return (
    <div>
      <AppBar position='static' alignitems='center' color='primary'></AppBar>
      <Grid
        container
        spacing={5}
        justify='center'
        direction='row'
        style={{ marginTop: '15px' }}
      >
        <Grid item>
          <Grid
            container
            direction='column'
            justify='center'
            spacing={0}
            className='signup-form'
          >
            <Paper
              variant='elevation'
              elevation={2}
              className='signup-background'
            >
              <Grid item>
                <Typography component='h2' variant='h4'>
                  Sign Up
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={(e) => handleRegister(e)}>
                  <Grid container direction='column' spacing={2}>
                    <Grid item>
                      <TextField
                        type='text'
                        placeholder='First Name'
                        fullWidth
                        variant='outlined'
                        value={formState.firstName}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            firstName: e.target.value,
                          })
                        }
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type='text'
                        placeholder='Last Name'
                        fullWidth
                        variant='outlined'
                        value={formState.lastName}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            lastName: e.target.value,
                          })
                        }
                        required
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type='email'
                        placeholder='Email'
                        fullWidth
                        variant='outlined'
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        required
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type='password'
                        placeholder='Password'
                        fullWidth
                        variant='outlined'
                        value={formState.password}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        style={{ marginRight: 40 }}
                        variant='contained'
                        color='primary'
                        type='submit'
                        className='button-block'
                      >
                        Sign Up
                      </Button>
                      <Button
                        variant='contained'
                        color='primary'
                        component={Link}
                        to={{
                          pathname: `/login`,
                        }}
                      >
                        Back to SignIn
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      {error ? (
        <Alert
          style={{ margin: '0 auto', display: 'flex', maxWidth: '220px' }}
          severity='error'
        >
          {registerErrorHandler(error)}
        </Alert>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default RegisterForm;
