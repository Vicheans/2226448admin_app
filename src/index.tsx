import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, ApolloProvider, ApolloLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import {cache, typeDefs} from './contexts/cache';

const uploadLink = createUploadLink({
  // uri: 'http://localhost:4000/'
  uri: 'https://2226448.linux.studentwebserver.co.uk'
});

const auth = setContext(async (_, { headers }) => {

  const token = localStorage.getItem('token');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const wsLink = new WebSocketLink({
  // uri: 'ws://localhost:4000/',
  uri: 'wss://2226448.linux.studentwebserver.co.uk',
  options: {
    // reconnect: true,
  }
});

const link = ApolloLink.split(({ query }) => {
  const def = getMainDefinition(query);
  return (
    def.kind === 'OperationDefinition' &&
    def.operation === 'subscription'
  )},
  wsLink,
   auth.concat(uploadLink));

const client = new ApolloClient({ link, cache, typeDefs });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
