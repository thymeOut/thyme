import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        isAdmin
      }
    }
  }
`;

function LoginForm() {
  const { setLoggedIn } = useContext(UserContext);

  const history = useHistory();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [login, { data, error }] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: (login) => {
      localStorage.setItem('token', login.login.token);
      localStorage.setItem('user-id', login.login.user.id);
      localStorage.setItem('isAdmin', login.login.user.isAdmin);
      setLoggedIn(true);
      history.push('/containers');
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div>
      <AppBar position='static' alignitems='center' color='primary'></AppBar>
      <Grid
        container
        style={{ marginTop: '15px' }}
        spacing={5}
        justify='center'
        direction='row'
      >
        <Grid item>
          <Grid
            container
            direction='column'
            justify='center'
            spacing={0}
            className='login-form'
          >
            <Paper
              variant='elevation'
              elevation={2}
              className='login-background'
            >
              <Grid item>
                <Typography component='h2' variant='h4' style={{fontFamily: 'Poppins',fontWeight: 'bold'}}>
                  Sign in
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={handleLogin}>
                  <Grid container direction='column' spacing={2}>
                    <Grid item>
                      <TextField
                        type='email'
                        placeholder='Email'
                        fullWidth
                        name='username'
                        variant='outlined'
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type='password'
                        placeholder='Password'
                        fullWidth
                        name='password'
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
                        style={{ marginRight: 60, fontFamily: 'Poppins',fontWeight: 'bold' }}
                        variant='contained'
                        color='primary'
                        type='submit'
                        className='button-block'
                      >
                        Sign In
                      </Button>
                      <Button
                       style={{ fontFamily: 'Poppins',fontWeight: 'bold' }}
                        variant='contained'
                        color='primary'
                        type='submit'
                        className='button-block'
                        component={Link}
                        to={{
                          pathname: `/register`,
                        }}
                      >
                        Register
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
          Wrong Email/Password
        </Alert>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default LoginForm;
