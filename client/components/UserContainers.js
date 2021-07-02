import React, { Fragment, useContext, useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_CONTAINERS = gql`
   query User ($id: ID!) {
    user(id: $id) {
      id
      containers{
          id
          name
      }
    }
   } 
`

export default function UserContainers() {
    console.log(localStorage.getItem('user-id'))
    const { loading, error, data } = useQuery(GET_CONTAINERS,
        {
            variables: {
                id: localStorage.getItem('user-id')
            }
        })
    if (loading) return '...loading'
    if (error) return '...error'
    console.log(data)
    return (
        <div>
            <h2>
                My Containers
            </h2>
            <div>
                {data && data.user.containers.map(container => <div key={container.id}>{container.name}</div>)}
            </div>
        </div>
    )
}