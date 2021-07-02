import React, { Fragment, useContext, useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_CONTAINERS = gql`
  query GetContainers {
    user(id: "2") {
      containers {
        name
      }
    }
  }
`;

export default function UserContainer() {
  const { loading, error, data } = useQuery(GET_CONTAINERS);
  return (
    <div>
      <h2>My Containers</h2>
      {/* <div>{data.user}</div> */}
    </div>
  );
}
