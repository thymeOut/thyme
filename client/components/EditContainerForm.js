import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useMutation } from "@apollo/client";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import UpdateContainer from "../../server/graphql/mutations/UpdateContainer.graphql";
import User from "../../server/graphql/queries/User.graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
}));

const EditContainerForm = (props) => {
  const classes = useStyles();
  const [containerName, setContainerName] = useState(props.container.name);
  const [containerType, setContainerType] = useState(props.container.type);

  const [updateContainer] = useMutation(UpdateContainer, {
    variables: {
      id: props.container.id,
      input: {
        name: containerName,
        type: containerType,
      },
    },
    refetchQueries: [
      {
        query: User,
        variables: {
          id: localStorage.getItem("user-id"),
        },
      },
    ],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setEditToggle(false);
    updateContainer({
      variables: {
        id: props.container.id,
        input: {
          name: containerName,
          type: containerType,
        },
      },
    });
  };

  return (
    <form className={classes.root}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
      >
        <div>Container Name:</div>

        <TextField
          onInput={(e) => setContainerName(e.target.value)}
          defaultValue={props.container.name}
        ></TextField>
        <TextField
          id="container-type"
          select
          label="Select"
          value={containerType}
          onChange={(e) => {
            setContainerType(e.target.value);
          }}
          helperText="Container Type"
          variant="outlined"
        >
          <MenuItem value="fridge">Fridge</MenuItem>
          <MenuItem value="freezer">Freezer</MenuItem>
          <MenuItem value="pantry">Pantry</MenuItem>
          <MenuItem value="minifridge">Mini-fridge</MenuItem>
        </TextField>
      </Grid>
      <DialogActions>
        <Button onClick={(e) => handleSubmit(e)} color="primary">
          Update
        </Button>
        <Button onClick={() => props.setEditToggle(false)} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </form>
  );
};

export default EditContainerForm;
