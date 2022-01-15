import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { linkError, linkAuth, linkMain, linkTokenHeader } from './links'

const inMemoryCache = new InMemoryCache()
export const apolloClientAuth = new ApolloClient({
  //DEV connectToDevTools to false in production
  connectToDevTools: true,
  link: linkAuth,
  cache: inMemoryCache
})

const options = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'none'
  },
  query: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'none'
  },
  mutate: {
    errorPolicy: 'none'
  }
}

export const apolloClientMain = new ApolloClient({
  //DEV connectToDevTools to false in production
  connectToDevTools: true,
  defaultOptions: options,
  link: ApolloLink.from([linkError, linkTokenHeader, linkMain]),
  cache: inMemoryCache
})
