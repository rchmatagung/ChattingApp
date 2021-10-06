import {useAuth0} from "@auth0/auth0-react";
import Main from './pages/main';
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink, ApolloLink } from "@apollo/client";
import { useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';


function App() {
  const {loginWithRedirect, getIdTokenClaims, isAuthenticated, isLoading, logout} = useAuth0();
  const [token, setToken] = useState("")

  getIdTokenClaims().then(resp => {
    console.log(resp)
    if(resp) {
      setToken(resp.__raw)
    }
  })

  if(isLoading) {
    return <LinearProgress />
  }

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_WEBSOCKET,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  },
});
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local cookie if it exists
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, splitLink]),
});
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Home isAuthenticated={isAuthenticated} loginWithRedirect={loginWithRedirect} />} />
          <Route exact path="/home/" component={() => <Main logout= {logout} />} />
          <Route exact path="/home/:id" component={() => <Main logout= {logout} />} />
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
