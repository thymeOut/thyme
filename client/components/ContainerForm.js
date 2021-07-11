import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const ADD_USER_TO_CONTAINER = gql`
  mutation AddUserToContainer($email: String!, $containerId: ID!) {
    addUserToContainer(email: $email, containerId: $containerId) {
      id
    }
  }
`;

const CREATE_CONTAINER = gql`
  mutation CreateContainer($name: String!, $type: ContainerType!) {
    createContainer(name: $name, type: $type) {
      id
      name
      type
    }
  }
`;

const ContainerForm = (props) => {
  const [containerName, setContainerName] = useState("");
  const [containerType, setContainerType] = useState("fridge");
  const [users, setUsers] = useState([]);
  const onKeyUp = (e) => {
    console.log(e.target.value);
    if (e.charCode === 13 && !users.find((user) => user === e.target.value)) {
      setUsers([...users, e.target.value]);
      console.log(users);
    }
  };

  const [createContainer, { data, error, loading }] = useMutation(
    CREATE_CONTAINER,
    {
      refetchQueries: [
        {
          query: props.GET_CONTAINERS,
          variables: {
            id: localStorage.getItem("user-id"),
          },
        },
      ],
    }
  );

  const [addUserToContainer, { error: addUserError }] = useMutation(
    ADD_USER_TO_CONTAINER
  );

  useEffect(() => {
    console.log("state changing");
  }, [users]);

  return (
    <Paper elevation={3}>
    <form
      className="container-form"
      onSubmit={(e) => {
        e.preventDefault();
        props.setCreateToggle(false);
        createContainer({
          variables: {
            name: containerName,
            type: containerType
          },
          update: (_, mutationResult) => {
            users.forEach((email) => {
              addUserToContainer({
                variables: {
                  email: email,
                  containerId: +mutationResult.data.createContainer.id,
                },
              });
            });
          },
        });
      }}
    >
      <input
        value={containerName}
        onChange={(e) => setContainerName(e.target.value)}
        type="text"
        placeholder="Container Name"
      />
      <select
        onChange={(e) => {
          setContainerType(e.target.value);
        }}
      >
        <option value="fridge">Fridge</option>
        <option value="freezer">Freezer</option>
        <option value="pantry">Pantry</option>
        <option value="minifridge">Mini-fridge</option>
      </select>
      
      <label>Add users</label>
      <input onKeyPress={onKeyUp} type="text" /> Click Enter to confirm (need to
      revist to allow for multiple entries)
      {users &&
        users.map((user, idx) => {
          return (
            <div>
              <input key={idx} onKeyPress={onKeyUp} type="text" />{" "}
            </div>
          );
        })}
      <button type="submit">Create Container</button>
    </form>
    </Paper>
  );
};

export default ContainerForm;

