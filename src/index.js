import React from 'react'
import ReactDOM from 'react-dom'
import Router from'./router/index.js'
import { StoreContext } from 'redux-react-hook'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store } from './store'
import '@/styles/rem.js'
import '@/styles/index.less'
import '@/styles/reset.css'
 


ReactDOM.render(
  <Provider store={store}>
    <StoreContext.Provider value={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <Router />
      </PersistGate>
    </StoreContext.Provider>
  </Provider>
, document.getElementById('root'));



