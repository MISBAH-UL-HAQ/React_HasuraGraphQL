
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://sterling-locust-83.hasura.app/v1/graphql", // your endpoint
  headers: {
    "x-hasura-admin-secret": "E4r2J4mEr4gBhnABTbjuUDL5jqZzddjoLemc25KIj5DOT0AXhUl3o2mj6sBxRKYj", // consider using env variables
  },
  cache: new InMemoryCache(),
});

export default client;
