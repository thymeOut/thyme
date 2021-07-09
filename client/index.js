import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
  headers: {
    authorization: localStorage.getItem('token') || '',
  },
});

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  headers: {
    authorization: localStorage.getItem('token') || '',
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
  document.getElementById('root')
);
