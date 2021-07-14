import React from "react";
import { useQuery, gql } from "@apollo/client";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom'

const GET_ALL_USERS_DATA = gql`
  query Users {
    users {
      id
      firstName
      lastName
      email
      isAdmin
      containers {
        id
        name
        type
        ownerId
      }
      containerItems {
        id
        originalQuantity
        quantityUsed
        expiration
        itemStatus
        containerId
        item {
          id
          name
        }
      }
    }
  }
`;

export default function AllUsersData() {
  const { loading, error, data } = useQuery(GET_ALL_USERS_DATA);
  if (loading) {
    return "loading..";
  }
  if (error) {
    console.log(error)
    return "Error";
  }


  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Id</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Admin</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {data?.users.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="right">{user.firstName}</TableCell>
              <TableCell align="right">{user.lastName}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.isAdmin.toString()}</TableCell>
              <TableCell align="right"><Link to={`/admin/${user.id}`}>Edit</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}
