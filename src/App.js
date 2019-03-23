import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import delay from 'delay';
import { ApolloClient, HttpLink, InMemoryCache, gql } from 'apollo-boost';
import { ApolloProvider, graphql } from 'react-apollo';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { mount } from 'enzyme';

const typeDefs = `
  type Query {
    product(id: String): Product
  }
  type Product {
    name: String
  }
`;

const mocks = {
  Int: () => 1,
  String: () => 'Mock',
  Float: () => 2.2,
  Boolean: () => false,
  Id: () => 'abc123',
};

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({
  schema,
  mocks,
});

const ApolloMockingProvider = (props) => {
  const client = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}

class Thinger extends Component {
  render() {
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.props.data && this.props.data.product && this.props.data.product.name || "no data"}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

const ThingerWithData = graphql(
  gql`
    query getProduct {
      product(id: "07800006") {
        name
      }
    }
  `)(Thinger);

class App extends Component {
  render() {
    return (
      <ApolloMockingProvider>
        <ThingerWithData />
      </ApolloMockingProvider>
    );
  }
}

export default App;
