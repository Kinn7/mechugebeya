import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import productsReducer from './app/features/products/productsSlice.jsx'
import { productApi } from './app/api/productApi.jsx'

const store = configureStore({
  reducer : {
    products : productsReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware)
})

// const store = configureStore({
//   reducer : {
//     products : productsReducer,
//     [productSlice.reducerPath]: productSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) => 
//     getDefaultMiddleware().concat(productSlice.middleware),
//   })

// setupListeners(store.dispatch)


ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <Provider store={store} >
    <ChakraProvider>
      <App />
    </ChakraProvider>
   </Provider>
 </BrowserRouter>
)
