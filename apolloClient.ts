import { ApolloClient, InMemoryCache } from '@apollo/client';

const countriesClient = new ApolloClient({
  uri: 'https://countries.trevorblades.com/graphql',
  cache: new InMemoryCache(),
});

export default countriesClient;
