import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import delay from 'delay';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders an enzyme test', async () => {
  const wrapper = mount(
    <App />
  );

  await delay(4000);

  const text = wrapper.text();
  expect(text).toMatch(/Mock/);
});
