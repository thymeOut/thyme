import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { gql, useMutation } from '@apollo/client';

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

function RegisterForm(props) {
    const history = useHistory();
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
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
            localStorage.setItem('token', data.createUser.token);
            localStorage.setItem('user-id', data.createUser.user.id);
            history.push('/login');
            console.log('signup');
        },
    });

    const handleRegister = (e) => {
        e.preventDefault()
        signup()
    }

    return (
        <div>
            <h2>Thyme</h2>
            <div className="form">
                <h4>Sign Up</h4>
                <form
                    className="form-elements"
                    onSubmit={(e) => handleRegister(e)}
                >
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
                            setFormState({...formState, password: e.target.value })
                        }
                        type="password"
                        placeholder="Password"
                    />
                    <button type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
