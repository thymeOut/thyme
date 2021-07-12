import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import SingleItemAdd from './SingleItemAdd';
// import { GET_CONTAINER } from './SingleContainer';

const GET_ITEMS = gql`
  query Items {
    items {
      id
      name
      imageUrl
    }
  }
`;

const GET_CONTAINER_ITEMS=gql`
query containerItems($id:ID){
  containerItems(id:$id){
    id
    userId
    expiration
  }
}`

export default function AddItemToContainer() {
  const { id } = useParams();
  const [addToggle, setAddToggle] = useState(false);
  const [containerItems, setContainerItems] = useState([]);
  const [itemId, setItemId] = useState(0);

  const {
    loading: itemsLoading,
    error: itemsError,
    data: itemsData,
  } = useQuery(GET_ITEMS);
  const {
    loading: contianerLoading,
    error: containerError,
    data: containerData,
  } = useQuery(GET_CONTAINER_ITEMS, {
    variables: {
      id: id,
    },
  });
  
  if (itemsLoading) {
    return '...loading';
  }
 
  if (itemsError) {
    return '...error';
  }

  const handleClick = (item) => {
    setAddToggle(true);
    setItemId(item.id);
  };
  
console.log(containerData)
  return (
    <React.Fragment>
      <h2>Choose one of these items</h2>
      <div>
        {itemsData.items.map((item) => {
          return (
            <div key={item.id}>
              <a
                href='#'
                onClick={() => {
                  handleClick(item);
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
      <div>
        <h2>Items Already in your Container</h2>
        <h3>
          {containerData?.containerItems.map((item) => {
            return (
              <div key={item.id}>
                <p>{item.name}</p>
              </div>
            );
          })}
        </h3>
      </div>
    </React.Fragment>
  );
}
