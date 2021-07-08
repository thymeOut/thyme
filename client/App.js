import React, { useState } from "react";
import Routes from "./Routes";
import NavBar from "./components/NavBar";
import { UserContext } from "./UserContext";

export default function App() {
  const token = window.localStorage.getItem('token');
  const [isLoggedIn, setLoggedIn] = useState(!!token);

  return (
    <UserContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <NavBar />
      <Routes />
    </UserContext.Provider>
  );
}

// import { useQuery, gql, useMutation } from "@apollo/client";
// import React, { Fragment, useContext, useEffect, useState } from "react";

// const GET_USERS = gql`
//  query GetUsers {
//    users {
//      id
//      firstName
//    }
//  }
// `

// const GET_USER = gql`
// query {user(id:"1"){
//   firstName
//   lastName
// }}`

// const UPDATE_USER = gql`
//  mutation UpdateUser($firstName: String!){

//  }`

// function App() {
//   const {loading, error, data} = useQuery(GET_USERS)
//   if (loading) return "loading...";
//   if (error) return "error...";
//   console.log(data)
//   return (
//     <div>
//       {data.users.map(user => <div key={user.id}>{user.firstName} {user.id}</div>)}
//     </div>
//   );
// }

// export default App;
