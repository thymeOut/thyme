import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import App from "./App";
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
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById("app")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
