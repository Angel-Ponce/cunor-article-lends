import "../styles/globals.scss";
import type { AppProps } from "next/app";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { HttpLink } from "@apollo/client/link/http";
import ProtectedLayout from "../components/templates/ProtectedLayout";
import store from "store2";
import { Provider } from "jotai";
import RoutesLayout from "../components/templates/RoutesLayout";

const tokenContext = setContext(() => {
  const token = store("token");

  if (token) {
    return {
      headers: {
        authorization: token,
      },
    };
  }

  return {
    headers: {},
  };
});

const link = new HttpLink({
  uri: "/api/graphql",
});

const client = new ApolloClient({
  link: tokenContext.concat(link),
  cache: new InMemoryCache(),
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Provider>
        <RoutesLayout>
          <ProtectedLayout>
            <Component {...pageProps} />
          </ProtectedLayout>
        </RoutesLayout>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
