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
    console.log(idx);
    e.preventDefault();

    if (idx === lineCount - 1) {
      console.log("test");
      setLineCount(lineCount + 1);
      console.log(lineCount);
    }
    console.log(props.addedUsers);
    console.log(props)
    props.addedUsers[idx] = e.target.value;
    console.log(props.addedUsers);
    props.setAddedUsers(props.addedUsers);
    console.log(props.addedUsers);
  };

  useEffect(() => {
    console.log("state changing");
  }, [props.addedUsers]);

  return [...Array(lineCount)].map((line, idx) => {
    return (
      <div>
          {console.log('testtt')}
        <TextField
          label="Email"
          onChange={(e) => handleAddUser(e, idx)}
        ></TextField>
      </div>
    );
  });
};

export default EmailForm;
