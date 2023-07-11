import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import productsReducer from './app/features/products/productsSlice.jsx'
import productsReducer2 from './app/features/products/productsSlice2.jsx'
import cartReducer from './app/features/cart/cartSlice.jsx'
import cartReducer2 from './app/features/cart/cartSlice2.jsx'
import { setupListeners } from '@reduxjs/toolkit/dist/query/index.js'

import { productApi } from './app/api/productApi.jsx'
import { orderApi } from './app/api/orderApi.jsx'
import { taskApi } from './app/api/taskApi.jsx'

const store = configureStore({
  reducer : {
    products : productsReducer,
    products2 : productsReducer2,
    cart : cartReducer,
    cart2 : cartReducer2,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [taskApi.reducerPath] : taskApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware,orderApi.middleware,taskApi.middleware)
})

// const store = configureStore({
//   reducer : {
//     products : productsReducer,
//     [productSlice.reducerPath]: productSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) => 
//     getDefaultMiddleware().concat(productSlice.middleware),
//   })

 setupListeners(store.dispatch)


ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <Provider store={store} >
    <ChakraProvider>
      <App />
    </ChakraProvider>
   </Provider>
 </BrowserRouter>
)
