import React from "react";
import "./styles.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bingo from "./pages/Bingo";
import Home from "./pages/Home";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Switch>
            <Route path="/bingo/:title">
              <Bingo />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}
