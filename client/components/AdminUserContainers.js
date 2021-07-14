
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup, Dialog, Checkbox } from "@material-ui/core";
import EditContainerForm from "./EditContainerForm";
import UpdateContainer from "../../server/graphql/mutations/UpdateContainer.graphql";
import { useMutation } from "@apollo/client";
import User from "../../server/graphql/queries/User.graphql";
import InactivateContainer from "./InactivateContainerAlert";


const AdminUserContainers = (props) => {
	const [ editToggled, setEditToggled ] = useState(false);
	const [ inactiveToggled, setInactiveToggled ] = useState(false);
	const [ currentContainer, setCurrentContainer ] = useState({});
	const [ updateContainer ] = useMutation(UpdateContainer);


  const handleActivate = (e) => {
    e.preventDefault();
    updateContainer({
      variables: {
        id: e.target.id,
        input: {
          isActive: true,
        },
      },
      refetchQueries: [
        {
          query: User,
          variables: {
            id: props.user.id,
          },
        },
      ],
    });
  };

  const handleStatus = (e) => {
    if (!e.target.checked) {
      setInactiveToggled(true);
    } else {
      handleActivate(e);
    }
  };

  return (
    <div>
      {editToggled && (
        <Dialog open={editToggled}>
          <EditContainerForm
            setEditToggle={setEditToggled}
            container={currentContainer}
          />
        </Dialog>
      )}
      {inactiveToggled && (
        <Dialog open={inactiveToggled}>
          <InactivateContainer
            setInactiveToggle={setInactiveToggled}
            container={currentContainer}
          />
        </Dialog>
      )}

      {props.user.containers.map((container) => {
        return (
          <div key={container.id} className="admin-button-group">
            <div>{container.name}</div>

            <Button
              onClick={() => {
                setCurrentContainer(container);
                setEditToggled(!editToggled);
              }}
            >
              Edit
            </Button>

            <div>
              Active
              <Checkbox
                value={container.id}
                checked={container.isActive}
                id={container.id}
                onClick={(e) => {
                  setCurrentContainer(container);
                  handleStatus(e);
                }}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div>
        );
      })}
      
    </div>
  );

};

export default AdminUserContainers;
