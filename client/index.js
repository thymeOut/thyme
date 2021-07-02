import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Entry from "./Entry";
import { BrowserRouter as Router } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  headers: {
    authorization: localStorage.getItem("token") || "",
  },
  cache: new InMemoryCache(),
  resolvers: {},
});




ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>   
      <Entry />
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);
