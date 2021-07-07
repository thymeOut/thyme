import React, { useState, useEffect } from 'react';
import { useLazyQuery, gql, useMutation } from '@apollo/client';

const CONTAINER_SEARCH_QUERY = gql`
  query Container($name: String!) {
    searchContainer(name: $name) {
      id
      name
      type
      items {
        name
      }
    }
  }
`;

const ADD_USER_TO_CONTAINER = gql`
  mutation AddUserToContainer($containerId: ID!) {
    addUserToContainer(containerId: $containerId) {
      id
    }
  }
`;

export default function Search(props) {
  const [searchFilter, setSearchFilter] = useState('');
  const [runQuery, { data, loading, error }] = useLazyQuery(
    CONTAINER_SEARCH_QUERY
  );
  const [addUserToContainer, { error: addUserError2 }] = useMutation(
    ADD_USER_TO_CONTAINER,
    {
      refetchQueries: [
        {
          query: props.GET_CONTAINERS,
          variables: {
            id: localStorage.getItem('user-id'),
          },
        },
      ],
    }
  );
  if (error) return '...error';

  return (
    <>
      <div className='Search'>
        <label>Search for a Container </label>
        <input
          type='text'
          id='searchBar'
          onChange={(event) => {
            setSearchFilter(event.target.value);
          }}
        />
        <button
          onClick={(event) => {
            event.preventDefault();
            runQuery({
              variables: { name: searchFilter },
              suspend: false,
            });
          }}
        >
          Search
        </button>
      </div>
      {data && data.searchContainer && (
        <div>
          <h2>{data.searchContainer.name}</h2>
          <div>Type: {data.searchContainer.type}</div>
          <div>
            Items:
            {data.searchContainer.items.map((item, index) => {
              return <div key={index}>{item.name}</div>;
            })}
            <button
              onClick={(e) => {
                props.setJoinToggle(false);
                addUserToContainer({
                  variables: {
                    containerId: data.searchContainer.id,
                  },
                });
              }}
            >
              Join This Container
            </button>
          </div>
        </div>
      )}
    </>
  );
}
