import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function EditItem(props) {
  const classes = useStyles();
  const { item, users } = props.location.state;
  const { containerItem } = item;

  const [expiration, setExpiration] = useState(
    new Date(containerItem.expiration)
  );
  const [imageUrl, setImageUrl] = useState(containerItem.imageUrl);
  const [ownerId, setOwnerId] = useState(containerItem.userId);
  console.log(ownerId);

  const handleChange = (event) => {
    console.log(event.target.value);

    if (event.target.name === 'owner') {
      setOwnerId(event.target.value);
    }
  };

  console.log(expiration.toISOString().slice(0, 10));

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit item
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                id="date"
                label="Expiration"
                type="date"
                name="expiration"
                onChange={handleChange}
                defaultValue={expiration.toISOString().slice(0, 10)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button variant="contained" component="label">
                change image
                <input type="file" hidden />
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Select
                id="select"
                label="Owner"
                name="owner"
                value={ownerId}
                onChange={handleChange}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.firstName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Done editing
          </Button>
        </form>
      </div>
    </Container>
  );
}
