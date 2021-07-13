import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

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
    password: ''
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: (login) => {
      console.log(login.login.token);
      localStorage.setItem('token', login.login.token);
      localStorage.setItem('user-id', login.login.user.id);
      localStorage.setItem('isAdmin', login.login.user.isAdmin)
      setLoggedIn(true);
      history.push('/');
    },
  });

  const handleLogin = (e) => {
    e.preventDefault()
    login()
  }

  return (
    <div>
      <div className="form">
        <h4>Login</h4>
        <form
          className="form-elements"
          onSubmit={(e) => handleLogin(e)}
        >
          <input
            value={formState.email}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
            type="text"
            placeholder="Email"
          />
          <input
            value={formState.password}
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value,
              })
            }
            type="password"
            placeholder="Password"
          />
          <button type="submit">
            Login
          </button>
        </form>

        <Link to="/register">
          <button >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
