import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const EmailForm = (props) => {
  const [lineCount, setLineCount] = useState(1);

  const handleAddUser = (e, idx) => {
    e.preventDefault();
    if (idx === lineCount - 1) {
      setLineCount(lineCount + 1);
    }
    props.addedUsers[idx] = e.target.value;
    props.setAddedUsers(props.addedUsers);
  };

  useEffect(() => {
  }, [props.addedUsers]);

  return [...Array(lineCount)].map((line, idx) => {
    return (
      <div>
        <TextField
        variant='filled'
          label="Email"
          onChange={(e) => handleAddUser(e, idx)}
        ></TextField>
      </div>
    );
  });
};

export default EmailForm;
