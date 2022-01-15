import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { authTokenActions } from './actions'
import { LOGOUT } from './mutations'
import { apolloClientAuth, apolloClientMain } from '../apollo'
import { possibleRefreshTokenErrors } from './utils'

export function useIsAuthenticated() {
  const isAuthenticated = useSelector(state => state.authToken.payload)

  const syncTabLogout = event => {
    if (event.key === 'isAuthenticated' && event.newValue === 'false') authTokenActions.logOut()
  }

  useEffect(() => {
    window.addEventListener('storage', syncTabLogout)
    return () => {
      window.removeEventListener('storage', syncTabLogout)
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      apolloClientAuth.mutate({ mutation: LOGOUT }).catch(error => {
        if (!possibleRefreshTokenErrors.includes(error.message)) {
          console.log(error.message)
        }
      })
      apolloClientAuth.clearStore() //apolloClientAuth.resetStore()
      apolloClientMain.clearStore() //apolloClientMain.resetStore()
      localStorage.setItem('isAuthenticated', false)
    } else {
      localStorage.setItem('isAuthenticated', true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return isAuthenticated
}
