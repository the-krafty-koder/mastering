import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { onError } from "@apollo/client/link/error";
import App from "./App.jsx";

const GITHUB_BASE_URL = "https://api.github.com/graphql";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors);
  }

  if (networkError) {
    console.log(networkError);
  }
});

const httpLink = createHttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${import.meta.env.VITE_GITHUB_PAT}`,
  },
});

const link = from([httpLink, errorLink]);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
