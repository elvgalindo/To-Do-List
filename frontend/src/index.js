import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from "react-apollo";
//adding the link where Apollo will open
//run graphql quiries from react to the server
const client = new ApolloClient({
    uri: "http://localhost:4000 "
  });
//Apollo will wrap the app and stating the apollo client or the link
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, 
    document.getElementById('root')
);
serviceWorker.unregister();
