import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import ContainerForm from "./CreateContainerForm";
import JoinContainer from "./JoinContainer";
import EditContainerMenu from "./EditContainerMenu";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
  expandOpen: {
    transform: "rotate(90deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const GET_CONTAINERS = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      containers {
        id
        name
        imageUrl
        isActive
        type
        containerUser {
          role
        }
      }
    }
  }
`;

export default function UserContainers() {
  const [createToggle, setCreateToggle] = useState(false);
  const [joinToggle, setJoinToggle] = useState(false);
  const [addToggle, setAddToggle] = useState(false);

  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_CONTAINERS, {
    variables: {
      id: localStorage.getItem("user-id"),
    },
  })

  if (loading) {
    return "...loading";
  }
  if (error) {
    return "...error";
  }

  return (
    <div>
      <h2>My Containers</h2>

      <ButtonGroup variant="outlined" color="primary">
        <Button onClick={() => setCreateToggle(!createToggle)}>
          Add new container
        </Button>
        <Button onClick={() => setJoinToggle(!joinToggle)}>
          Join a container
        </Button>
      </ButtonGroup>
      {createToggle && (
        <Dialog open={createToggle}>
          <ContainerForm setCreateToggle={setCreateToggle} GET_CONTAINERS={GET_CONTAINERS}/>
        </Dialog>
      )}
      {joinToggle && (
        <Dialog open={joinToggle}>
          <JoinContainer setJoinToggle={setJoinToggle} GET_CONTAINERS={GET_CONTAINERS} currentContainers={data.user.containers}/>
        </Dialog>
      )}
      <Grid container spacing={3}>
        {data &&
          data.user.containers
            .filter((container) => container.isActive)
            .map((container) => (
              <Grid item xs={3} key={container.id}>
                <Card className={classes.root}>
                  <CardHeader
                    title={container.name}
                    action={
                      container.containerUser.role === "owner" ? (
                        <EditContainerMenu
                          container={container}
                          GET_CONTAINERS={GET_CONTAINERS}
                        />
                      ) : null
                    }
                  />
                  <CardMedia
                    className={classes.media}
                    image={container.imageUrl}
                  />
                  <Link to={`/containers/${container.id}`}>
                    <div>{container.name}</div>
                  </Link>

                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>

                  <IconButton
                    aria-label="show more"
                    onClick={() => setAddToggle(!addToggle)}
                  >
                    <ShareIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))}
      </Grid>
    </div>
  );
}
