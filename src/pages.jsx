import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authTokenActions } from './modAuth/actions'

const Logout = () => <button onClick={authTokenActions.logOut}>Logout</button>
export const PrivatePage1 = () => (
  <div>
    Private page
    <br />
    <Link to='/private'>go to Private page 2</Link>
    <br />
    <Link to='/some-other-page'>go to some other page</Link>
    <br />
    <Logout />
  </div>
)
export const PrivatePage2 = () => (
  <div>
    Private page 2
    <br />
    <Link to='/'>go to Private page 1</Link>
    <br />
    <Link to='/some-other-page'>go to some other page</Link>
    <br />
    <Logout />
  </div>
)
export const NotFound404 = () => {
  const navigate = useNavigate()
  return (
    <div>
      Not Found 404
      <br />
      <button onClick={() => navigate(-1)}>Go Back</button>
      <br />
      <Logout />
    </div>
  )
}
