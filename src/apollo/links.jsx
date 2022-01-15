import { onError } from '@apollo/client/link/error'
import { createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getAccessTokenPromise } from '../modAuth/utils'

export const errorHandler = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors) graphQLErrors.forEach(({ message }) => console.log(message))
  if (networkError) {
    console.log(networkError)
  }
  // response.errors = undefined
}

export const linkError = onError(errorHandler)

export const linkAuth = createHttpLink({
  // uri: 'http://localhost:8000/auth',
  // uri: 'http://localhost:3000/auth',
  uri: '/auth',
  // DEV purpose of credential header and CORS... check before production release
  credentials: 'include'
})

export const linkMain = createHttpLink({
  // uri: 'http://localhost:8000/graphql',
  // uri: 'http://localhost:3000/graphql',
  uri: '/graphql',
  // DEV purpose of credential header and CORS... check before production release
  credentials: 'same-origin'
})

// VERSION 1
export const linkTokenHeader = setContext(async (_, { headers }) => {
  const accessToken = await getAccessTokenPromise()
  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `JWT ${accessToken}` : ''
    }
  }
})

// VERSION 2
// import { ApolloLink, fromPromise } from '@apollo/client';
// export const linkTokenHeader = new ApolloLink((operation, forward) =>
//   fromPromise(getAccessTokenPromise())
//     .flatMap(accessToken => {
//       operation.setContext(({ headers = {} }) => ({
//         headers: {
//           ...headers,
//           Authorization: accessToken ? `JWT ${accessToken}` : '',
//         }
//       }
//       ))
//       return forward(operation)
//     })
// )
