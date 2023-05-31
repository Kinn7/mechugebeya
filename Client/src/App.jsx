import { useState } from 'react'
import { Routes , Route } from 'react-router-dom'
//import { Products } from './components/products'
import  Products  from './app/features/products/Products'
import Ex from './app/features/products/Ex'

//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

const App = () => {

  return (
    <>
    <Routes>
      <Route path='/' element={<Products />} />
      <Route path='/expt' element={<Ex />} />
    </Routes>
    </>
  )
}

export default App
