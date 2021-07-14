import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import User from "../../server/graphql/queries/User.graphql";
import { useQuery } from "@apollo/client";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import EditContainerMenu from "./EditContainerMenu";
import UserSettingForm from "./UserSettingForm";
import AdminUserContainers from "./AdminUserContainers";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function AdminEditUser(props) {

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { loading, error, data } = useQuery(User, {
    variables: {
      id: +props.match.params.id,
    },
  });

  if (loading) {
    return "...loading";
  }
  if (error) {
    return "...error";
  }

  return (
    <Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Containers" />
        <Tab label="Accounts Settings" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AdminUserContainers user={data.user} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserSettingForm user={data.user} />
      </TabPanel>
    </Paper>
  );
}
