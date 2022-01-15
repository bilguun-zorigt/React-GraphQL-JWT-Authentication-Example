import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { authTokenActions } from './actions'
import { errorHandler, apolloClientAuth } from '../apollo'

import { LOGIN } from './mutations'

export const Login = () => {
  const [login, { data, loading }] = useMutation(LOGIN, { client: apolloClientAuth })

  const onChangeEmail = e => (e.target.value = e.target.value.toLowerCase())

  const onSubmit = e => {
    e.preventDefault()
    login({ variables: { email: e.target.email.value, password: e.target.password.value } }).catch(errorHandler)
  }

  useEffect(() => {
    if (data && data.tokenAuth) authTokenActions.setAuthToken(data.tokenAuth)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <form onSubmit={onSubmit}>
      <input name='email' type='email' placeholder='E-Mail' required autoFocus={true} onChange={onChangeEmail} />
      <input name='password' type='password' placeholder='Password' required />
      <button type='submit'>{loading ? 'loading...' : 'Login'}</button>
    </form>
  )
}
