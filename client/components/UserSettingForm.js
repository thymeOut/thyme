import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useMutation, gql } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserInfoInput!) {
    updateUser(id: $id, input: $input) {
      id
      firstName
      lastName
      email
      isAdmin
    }
  }
`;

const UserSettingForm = (props) => {
  const [accountData, setAccountData] = useState({
    firstName: props.user.firstName,
    lastName: props.user.lastName,
    email: props.user.email,
    isAdmin: props.user.isAdmin,
  });

  const [updateUser] = useMutation(UPDATE_USER);

  const handleSubmit = (e) => {
    console.log(accountData);
    e.preventDefault();
    updateUser({
      variables: {
        id: props.user.id,
        input: accountData,
      },
    });
  };

  const handleFieldChange = (e) => {
    accountData[e.target.id] = e.target.value;
    setAccountData(accountData);
  };
  const handleAdminChange = (event) => {
    setAccountData({ ...accountData, isAdmin: !accountData.isAdmin });
  };

  return (
    <form>
      <div>
        First Name
        <TextField
          id="firstName"
          defaultValue={props.user.firstName}
          onChange={(e) => handleFieldChange(e)}
        >
          {props.user.firstName}
        </TextField>
      </div>
      <div>
        Last Name
        <TextField
          id="lastName"
          defaultValue={props.user.lastName}
          onChange={(e) => handleFieldChange(e)}
        >
          {props.user.lastName}
        </TextField>
      </div>
      <div>
        Email
        <TextField
          id="email"
          defaultValue={props.user.email}
          onChange={(e) => handleFieldChange(e)}
        >
          {props.user.email}
        </TextField>
      </div>
      <div>
        Admin
        <Checkbox
          checked={accountData.isAdmin}
          onChange={handleAdminChange}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
      <Button
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Update User
      </Button>
    </form>
  );
};

export default UserSettingForm;
