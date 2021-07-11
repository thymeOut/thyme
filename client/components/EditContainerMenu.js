import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Dialog from "@material-ui/core/Dialog";
import EditContainerForm from "./EditContainerForm";
import InactivateContainer from "./InactivateContainerAlert";

const UPDATE_CONTAINER = gql`
  mutation UpdateContainer($id: ID!, $input: ContainerInput) {
    updateContainer(id: $id, input: $input) {
      name
    }
  }
`;

const EditContainerMenu = (props) => {
  const [editToggle, setEditToggle] = useState(false);
  const [inactiveToggle, setInactiveToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [updateContainer] = useMutation(UPDATE_CONTAINER, {
    refetchQueries: [
      {
        query: props.GET_CONTAINERS,
        variables: {
          id: localStorage.getItem("user-id"),
        },
      },
    ],
  }); 

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleActivate = (e) => {
    e.preventDefault();
    updateContainer(
        {
            variables: {
                id: props.container.id,
                input: {
                  isActive: true
                }, 
            }
        }
    )
  };

  return (
    <div>
      {editToggle && (
        <Dialog open={editToggle}>
          <EditContainerForm
            setEditToggle={setEditToggle}
            container={props.container}
            UPDATE_CONTAINER={UPDATE_CONTAINER}
            GET_CONTAINERS={props.GET_CONTAINERS}
          />
        </Dialog>
      )}
      {inactiveToggle && (
        <Dialog open={inactiveToggle}>
          <InactivateContainer
            setInactiveToggle={setInactiveToggle}
            container={props.container}
            UPDATE_CONTAINER={UPDATE_CONTAINER}
            GET_CONTAINERS={props.GET_CONTAINERS}
          />
        </Dialog>
      )}
      <IconButton aria-label="settings" onClick={handleMenu}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setEditToggle(true);
          }}
        >
          Edit Container
        </MenuItem>
        {props.container.isActive ? (<MenuItem
          onClick={() => {
            handleClose();
            setInactiveToggle(true);
          }}
        >
          Inactivate
        </MenuItem>): 
        (<MenuItem
        onClick={(e) => {
          handleClose();
          handleActivate(e)
        }}
      >
        Activate
      </MenuItem>)}
      </Menu>
    </div>
  );
};

export default EditContainerMenu;
