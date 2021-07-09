import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useMutation } from "@apollo/client";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const InactivateContainer = (props) => {
  const [containerName, setContainerName] = useState("");

  const [inactivateContainer] = useMutation(props.UPDATE_CONTAINER, {
    variables: {
      id: props.container.id,
      input: {
        isActive: false,
      },
    },
    refetchQueries: [
      {
        query: props.GET_CONTAINERS,
        variables: {
          id: localStorage.getItem("user-id"),
        },
      },
    ],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (containerName === props.container.name) {
      inactivateContainer();
    }
  };

  return (
    <form>
      If you would like to inactive {props.container.name}, please enter it
      here:
      <TextField onInput={(e) => setContainerName(e.target.value)}></TextField>
      <DialogActions>
        <Button onClick={(e) => handleSubmit(e)} color="primary">
          Inactivate
        </Button>
        <Button onClick={() => props.setInactiveToggle(false)} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </form>
  );
};

export default InactivateContainer;
