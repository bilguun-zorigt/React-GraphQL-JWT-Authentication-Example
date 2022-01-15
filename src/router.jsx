import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useIsAuthenticated } from './modAuth/hooks'
import { Login } from './modAuth/login'
import { NotFound404, PrivatePage1, PrivatePage2 } from './pages'

export function MainRouter() {
  const isAuthenticated = useIsAuthenticated()
  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated && (
          <>
            <Route key='' path='/' element={<PrivatePage1 />} />
            <Route key='' path='/private' element={<PrivatePage2 />} />
            <Route path='*' element={<NotFound404 />} />
          </>
        )}
        <Route key='' path='/public' element={<div>Public page</div>} />,
        <Route key='' path='/public-2' element={<div>Public page 2</div>} />
        <Route path='*' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
