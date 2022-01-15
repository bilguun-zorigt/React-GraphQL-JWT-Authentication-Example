import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      payload
      refreshExpiresIn
    }
  }
`

export const REFRESH = gql`
  mutation Refresh {
    refreshToken {
      token
      payload
      refreshExpiresIn
    }
  }
`

export const LOGOUT = gql`
  mutation LogOut {
    revokeToken {
      revoked
    }
    deleteRefreshTokenCookie {
      deleted
    }
  }
`
