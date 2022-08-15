import { ApolloClient, InMemoryCache,ApolloProvider } from "@apollo/client"
import type { AppProps } from 'next/app'

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
