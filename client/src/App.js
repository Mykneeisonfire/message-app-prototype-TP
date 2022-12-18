import "./App.css";
import { Route, Switch } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
  <div className="App">
      <Switch>
            <Route path="/" component={Homepage} exact />
            <Route path="/chats" component={ChatPage} />
      </Switch>
      </div>
</ApolloProvider>
  );
}

export default App;
