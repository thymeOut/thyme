import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import KitchenIcon from '@material-ui/icons/Kitchen';
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { Link } from 'react-router-dom';


export const MainListItems = () => {

  return (
    <div>
      <ListItem button component={Link} to="/containers">
        <ListItemIcon>
          <KitchenIcon />
        </ListItemIcon>
        <ListItemText primary="Containers" />
      </ListItem>
      <ListItem button component={Link} to="/items">
        <ListItemIcon>
          <FastfoodIcon />
        </ListItemIcon>
        <ListItemText primary="Items" />
      </ListItem>
      <ListItem button component={Link} to="/charts">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Test" />
      </ListItem>
    </div>
  );
};

export const SecondaryListItems = () => {
  return (
    <div>
      <ListSubheader inset>Admin Priveledges</ListSubheader>
      
      <ListItem button component={Link} to="/admin">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Admin" />
      </ListItem>
    </div>
  );
};
