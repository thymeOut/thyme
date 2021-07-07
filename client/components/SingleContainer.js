import React, { Fragment, useContext, useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_CONTAINER = gql`
  query Container($id: ID!) {
    container(id: $id) {
      id
      name
      users {
        id
        firstName
        lastName
      }
      items {
        name
        imageUrl
        containerItem {
          userId
          quantity
        }
      }
    }
  }
`;

export default function SingleContainer(props) {
  const containerId = props.match.params.id;

  const { loading, error, data } = useQuery(GET_CONTAINER, {
    variables: {
      id: containerId,
    },
  });

  if (loading) return "...loading";
  if (error) return "...error";
  console.log(data);
  return (
    <div>
      <h2>{data.container.name}</h2>
      <h3>Users</h3>
      <div>
        {data.container.users.map((user) => {
          return (
            <div key={user.id}>
              {user.firstName} {user.lastName}
            </div>
          );
        })}
      </div>
      <h3>Contents</h3>
      <div>
        {
          data.container.items.map(item => {
            return (
              <div key={item.id}>
                <div>{item.name} - {item.containerItem.quantity}</div>
                <div>
                  {
                    data.container.users.map(user => {
                      if (user.id === item.containerItem.userId) {
                        return <div>{user.firstName}</div>
                      }
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
      <Link to={`${containerId}/add`}>Add an item</Link>
      <Link to="/containers">Back to all containers</Link>
    </div>
  );
}
