import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import ContainerForm from "./ContainerForm";
import JoinContainer from "./JoinContainer";

const GET_CONTAINERS = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      containers {
        id
        name
      }
    }
  }
`;

const CREATE_CONTAINER = gql`
  mutation CreateContainer($name: String!, $type: ContainerType!, $owner: ID!) {
    createContainer(name: $name, type: $type, owner: $owner) {
      name
      type
    }
  }
`;

export default function UserContainers() {
  const [createToggle, setCreateToggle] = useState(false);
  const [joinToggle, setJoinToggle] = useState(false);

  const { loading, error, data } = useQuery(GET_CONTAINERS, {
    variables: {
      id: localStorage.getItem("user-id"),
    },
  });

  const [createContainer, { containerdata }] = useMutation(CREATE_CONTAINER, {
    refetchQueries: [
      {
        query: GET_CONTAINERS,
        variables: {
          id: localStorage.getItem("user-id"),
        },
      },
    ],
  });

  if (loading) return "...loading";
  if (error) return "...error";

  return (
    <div>
      <h2>My Containers</h2>
      <div>
        {data &&
          data.user.containers.map((container) => (
            <Link to={`/containers/${container.id}`} key={container.id}>
              <div>{container.name}</div>
            </Link>
          ))}
        <button onClick={() => setCreateToggle(true)}>
          {" "}
          Add new container
        </button>
        {createToggle && (
          <ContainerForm
            createContainer={createContainer}
            setCreateToggle={setCreateToggle}
          />
        )}
        <button onClick={() => setJoinToggle(true)}> Join a container</button>
        {joinToggle && <JoinContainer setJoinToggle={setJoinToggle} />}
      </div>
    </div>
  );
}
