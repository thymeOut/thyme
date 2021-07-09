import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Grid from "@material-ui/core/Grid";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

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
  const [searchFilter, setSearchFilter] = useState("");

  const [runQuery, { data, loading, error }] = useLazyQuery(
    CONTAINER_SEARCH_QUERY
  );

  const [addUserToContainer, { error: addUserError }] = useMutation(
    ADD_USER_TO_CONTAINER,
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

  if (loading) {
    return "...loading";
  }

  if (error) {
    return "...error";
  }

  const handleSearch = (e) => {
    e.preventDefault();
    runQuery({
      variables: { name: searchFilter },
      suspend: false,
    });
  };
  const handleJoinContainer = (e, id) => {
    e.preventDefault();
    try {
      console.log(id)
      addUserToContainer({
        variables: {
          containerId: id,
        },
      });
    } catch (error) {
      console.log("errorasldkjfhlakwhe");
    }
  };

  return (
    <>
      <ClickAwayListener onClickAway={() => props.setJoinToggle(false)}>
        <form
          onSubmit={
            console.log("submit")
            // handleJoinContainer
          }
        >
          <InputBase
            type="text"
            id="searchBar"
            onChange={(event) => {
              setSearchFilter(event.target.value);
            }}
            placeholder="Search by Container Name"
          />
          <IconButton type="submit" aria-label="search" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
          {data?.searchContainer.map((container) => {
            return <div key={container.id}>{container.name}
            <Button onClick={(e)=>handleJoinContainer(e, container.id)} color="primary">
              Request to Join
            </Button>
            </div>;
            
          })}

          <DialogActions>
            <Button onClick={() => props.setJoinToggle(false)} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </ClickAwayListener>
    </>
  );
}
