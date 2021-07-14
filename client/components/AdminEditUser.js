import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import User from "../../server/graphql/queries/User.graphql";
import { useQuery, useMutation, gql } from "@apollo/client";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import EditContainerMenu from "./EditContainerMenu"

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
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function AdminEditUser(props) {
  const [containerData, setContainerData] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(props)

  const { loading, error, data } = useQuery(User, {
    variables: {
      id: +props.match.params.id,
    },
    onCompleted: () => {
      setAccountData(
        JSON.stringify(
          {
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            isAdmin: data.user.isAdmin,
          },
          null,
          4
        )
      );
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
      variables: {
          id: +props.match.params.id,
          input: JSON.parse(accountData)
      }
  })


  // const handleAccountChange = (e) => {
  //   setAccountData(e.target.value)
  //   console.log(e.target.value)
  // }

  if (loading) {
    return "...loading";
  }
  if (error) {
    return "...error";
  }

  return (
    <Card>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example">
        <Tab label="Containers" />
        <Tab label="Container Items" />
        <Tab label="Accounts Settings" />
      </Tabs>
      <TabPanel  value={value} index={0}>
        {data.user.containers.map((container) => {
          return (
            <span key={container.id} >
              <EditContainerMenu container={ container}/>
              {container.name}
          </span>
          )
        })}
      </TabPanel>
      <TabPanel  value={value} index={1}>
        {console.log(data)}
        {data.user.containerItems.map((item) => {
          return (
            <span key={item.id} >
              {item.item.name}
          </span>
          )
        })}
      </TabPanel>
      <TabPanel  value={value} index={2}>
        <span>{data.user.firstName}</span>
      <span>{data.user.lastName}</span>
      <span>{data.user.email}</span>
      <span>{data.user.isAdmin}</span>


      </TabPanel>
    </Card>
  );
}
