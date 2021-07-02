import React, { useState } from "react";
import { useHistory } from "react-router";
import { gql, useMutation, useQuery } from "@apollo/client";


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
    const history = useHistory()
    const [formState, setFormState] = useState({
      login: true,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    });
    const [login] = useMutation(LOGIN_MUTATION, {
      variables: {
        email: formState.email,
        password: formState.password,
      },
      onCompleted: (login) => {
        console.log(login.login.token)
        localStorage.setItem("token", login.login.token);
        localStorage.setItem("user-id", login.login.user.id);
        history.push('/');
      },
    });

    const [signup] = useMutation(SIGNUP_MUTATION, {
      variables: {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password,
      },
      onCompleted: (data) => {
        console.log(data);
        localStorage.setItem("token", data.createUser.token);
        history.push('/');
        console.log("signup");
      },
    });

    return (<div>
      <h2>Thyme</h2>
      <div className="form">
        <h4>{formState.login ? "Login" : "Sign Up"}</h4>
        <form className="form-elements"
          onSubmit={
            formState.login
              ? (e) => {
                  e.preventDefault();
                  login;
                }
              : (e) => {
                  e.preventDefault();
                  signup;
                }
          }
        >
          {!formState.login && (
            <div>
              <input
                value={formState.firstName}
                onChange={(e) =>
                  setFormState({ ...formState, firstName: e.target.value })
                }
                type="text"
                placeholder="First Name"
              />
              <input
                value={formState.lastName}
                onChange={(e) =>
                  setFormState({ ...formState, lastName: e.target.value })
                }
                type="text"
                placeholder="Last Name"
              />
            </div>
          )}
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
          <button type="submit" onClick={formState.login ? login : signup}>
            {formState.login ? "Login" : "Register"}
          </button>
        </form>
        <div>
          <button
            onClick={() =>
              setFormState({
                ...formState,
                login: !formState.login,
              })
            }
          >
            {formState.login ? "Register" : "Already Registered? Log in!"}
          </button>
        </div>
      </div>
      </div>
    );
  }

  export default LoginForm;
