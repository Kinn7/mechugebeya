import { useState } from 'react'
import { Routes , Route } from 'react-router-dom'
import  Products  from './app/features/products/Products'
import CartItem from './app/features/cart/CartItem'
import Dispatcher from './app/features/dispatcher/Dispatcher'
import Assistant from './app/features/assistant/Assistant'
import ProductDetail from './app/features/products/ProductDetail'
import SignupCard from './app/features/products/SignUp'
import SignIn from './app/features/products/Signin'
import Dashboard from './app/features/dispatcher/Dashboard'
import Orders from './app/features/dispatcher/Orders'
import Task from './app/features/dispatcher/Task'


//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

const App = () => {

  return (
    <>
    <Routes>
      <Route path='/' element={<Products />} />
      <Route path='/cart' element={<CartItem/>} />
      <Route path='/product_details/:id' element={<ProductDetail/>} />
      <Route path='/dispatcher' element={<Dispatcher />} />
      <Route path='/assistant' element={<Assistant />} />
      <Route path='/signup' element={<SignupCard /> } />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/orders/tasks/:orderId' element={<Task />} />
    </Routes>
    </>
  )
}

export default App
