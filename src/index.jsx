import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { reduxStoreMain, reduxStoreMainPersistor } from './redux'

import { ApolloProvider } from '@apollo/client'
import { apolloClientMain } from './apollo'

import { MainRouter } from './router'

function App() {
  return (
    <Provider store={reduxStoreMain}>
      <PersistGate loading={<p>loading...</p>} persistor={reduxStoreMainPersistor}>
        <ApolloProvider client={apolloClientMain}>
          <MainRouter />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
