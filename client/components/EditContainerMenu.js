import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InactivateContainer from './InactivateContainerAlert'


const UPDATE_CONTAINER = gql`
mutation UpdateContainer($id: ID!, $input: ContainerInput) {
    updateContainer(id: $id, input: $input){
      name
    }
  }
`;

const EditContainerMenu = (props) => {
  const [containerName, setContainerName] = useState("");
  const [containerType, setContainerType] = useState("fridge");
  const [expanded, setExpanded] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [inactiveToggle, setInactiveToggle] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
            setEditToggle(!editToggle);
          }}
        >
          Edit Container
        </MenuItem>
        <MenuItem
          onClick={() => {
            // handleClose();
            console.log(inactiveToggle)
            setInactiveToggle(!inactiveToggle)
          }}
        >
          Inactivate
        </MenuItem>
        {inactiveToggle ? <InactivateContainer container={props.container} UPDATE_CONTAINER={UPDATE_CONTAINER} GET_CONTAINERS={props.GET_CONTAINERS}/> :null}
      </Menu>
    </div>
  );
};

export default EditContainerMenu;
