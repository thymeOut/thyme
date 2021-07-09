import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import SingleItemAdd from './SingleItemAdd';

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
  const { id } = useParams();
  const [addToggle, setAddToggle] = useState(false);
  const [itemId, setItemId] = useState(0);
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
          return (
            <div key={item.id}>
              <a
                href='#'
                onClick={() => {
                  setAddToggle(true);
                  setItemId(item.id);
                }}
              >
                {item.name}
              </a>
            </div>
          );
        })}
      </div>
      <h3>...or, create a new one</h3>
      <Link to='create'>Create</Link>
      {addToggle && (
        <SingleItemAdd
          setAddToggle={setAddToggle}
          itemId={itemId}
          containerId={id}
        />
      )}
    </React.Fragment>
  );
}
