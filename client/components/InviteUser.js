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
import EmailForm from "./EmailForm";
import AddUserToContainer from "../../server/graphql/mutations/AddUserToContainer.graphql";

export default function InviteUser(props) {
  const [addedUsers, setAddedUsers] = useState([]);
  const [addUserToContainer] = useMutation(AddUserToContainer);

  const inviteUsers = (e) => {
    e.preventDefault();
    props.setShareToggle(false);
    addedUsers.map((email) => {
      return addUserToContainer({
        variables: {
          input: {
            email: email,
            role: "user",
          },
          containerId: props.container
        },
      });
    });
  };

  return (
    <form>
      <EmailForm setAddedUsers={setAddedUsers} addedUsers={addedUsers} />
      <Button onClick={(e) => inviteUsers(e)} color="primary">
        Invite!
      </Button>
    </form>
  );
}
