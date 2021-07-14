import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import ContainerForm from "./CreateContainerForm";
import JoinContainer from "./JoinContainer";
import EditContainerMenu from "./EditContainerMenu";
import { makeStyles } from "@material-ui/core/styles";
import User from "../../server/graphql/queries/User.graphql";
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import InviteUser from "./InviteUser";

import {
  Select,
  Dialog,
  ButtonGroup,
  Button,
  Typography,
  CardMedia,
  CardHeader,
  Card,
  Grid,
} from "@material-ui/core";
import EmailForm from "./EmailForm";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    maxHeight: 400,
    minWidth: 100,
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

const containerMembership = [
  {
    header: "My Containers",
    role: "owner",
  },
  {
    header: "Joined Containers",
    role: "user",
  },
  {
    header: "Pending Invite",
    role: "pending",
  },
];

export default function UserContainers() {
  const [createToggle, setCreateToggle] = useState(false);
  const [joinToggle, setJoinToggle] = useState(false);
  const [shareToggled, setShareToggle] = useState(false);
  const [containerStatus, setContainerStatus] = useState(true);
  const [container, setContainer] = useState(0)

  const classes = useStyles();

  const { loading, error, data } = useQuery(User, {
    variables: {
      id: localStorage.getItem("user-id"),
    },
  });

  if (loading) {
    return "...loading";
  }
  if (error) {
    return "...error";
  }

  return (
    <div className="all-container-view">
      <h2>My Containers</h2>
      <div className="all-container-header">
        <ButtonGroup variant="outlined" color="primary">
          <Button onClick={() => setCreateToggle(!createToggle)}>
            Add new container
          </Button>
          <Button onClick={() => setJoinToggle(!joinToggle)}>
            Join a container
          </Button>
        </ButtonGroup>
        <Select native onChange={(e) => setContainerStatus(e.target.value)}>
          <option value={true}>Active Containers</option>
          <option value={false}>Inactive Containers</option>
        </Select>
      </div>
      {createToggle && (
        <Dialog open={createToggle}>
          <ContainerForm
            setCreateToggle={setCreateToggle}
            GET_CONTAINERS={User}
          />
        </Dialog>
      )}
      {joinToggle && (
        <Dialog open={joinToggle}>
          <JoinContainer
            setJoinToggle={setJoinToggle}
            GET_CONTAINERS={User}
            currentContainers={data.user.containers}
          />
        </Dialog>
      )}
      {shareToggled && (
        <Dialog open={shareToggled}>
          <InviteUser
            setShareToggle={setShareToggle}
            GET_CONTAINERS={User}
            container={container}
          />
        </Dialog>
      )}

      {containerMembership.map((membership) => {
        return (
          <div key={membership.header}>
            <h3>{membership.header}</h3>
            <Grid container spacing={3} margin="100px">
              {data?.user.containers
                .filter(
                  (container) =>
                    container.isActive.toString() ===
                      containerStatus.toString() &&
                    container.containerUser.role === membership.role
                )
                .map((container) => (
                  <Grid item xs={6} sm={3} key={container.id}>
                    <Card className={classes.root}>
                      <CardHeader
                        title={
                          <Typography noWrap>
                            <Link to={`/containers/${container.id}`}>
                              {container.name}
                            </Link>
                          </Typography>
                        }
                        action={
                          <div className="container-buttons">
                            
                            {membership.role === "owner" && (
                              <EditContainerMenu
                                container={container}
                                GET_CONTAINERS={User}
                              />
                            )}
                            
                            <IconButton aria-label="share" onClick={()=>{
                              setContainer(container.id)
                              setShareToggle(!shareToggled)}} >
                              <ShareIcon />
                            </IconButton>
                          </div>
                        }
                      />
                      <CardMedia
                        className={classes.media}
                        image={container.imageUrl}
                      />
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </div>
        );
      })}
    </div>
  );
}
