import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_ITEMS = gql`
  query Items {
    items {
      id
      name
      imageUrl
    }
  }
`;

export default function AddItemToContainer() {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) {
    return '...loading';
  }

  if (error) {
    return '...error';
  }

  return (
    <React.Fragment>
      <h2>Choose one of these items</h2>
      <div>
        {data.items.map((item) => {
          return <div key={item.id}>{item.name}</div>;
        })}
      </div>
      <h3>...or, create a new one</h3>
      <Link to="create">Create</Link>
    </React.Fragment>
  );
}
