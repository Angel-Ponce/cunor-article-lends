import "../styles/globals.scss";
import type { AppProps } from "next/app";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization:
      "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFuZ2VsIiwibGFzdG5hbWUiOiJQb25jZSIsInBob25lIjoiMzEzOTY4NDAiLCJkZXNjcmlwdGlvbiI6bnVsbCwidXNlcm5hbWUiOiJhbmdlbC5wb25jZSIsInBhc3N3b3JkIjoiMTIzIiwicm9sZSI6ImFkbWluIiwiaW5zdGl0dXRpb25JZCI6MSwiYWxnIjoiSFMyNTYifQ.GFgd027wR21UapWqeo8-_NMc4j4ETWqpEH4zr0ndnB8",
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
