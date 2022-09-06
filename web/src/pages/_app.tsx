import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { Layout } from '../components/layout'

import '../../styles/globals.css'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp
