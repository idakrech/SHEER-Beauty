/* eslint-disable @typescript-eslint/no-unused-vars */
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { listenToAuth } from './helpers/authListener'
import { AppDispatch } from './redux'
import AuthForm from './components/AuthForm'


function App() {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(listenToAuth())
  }, [dispatch])


  return (
    
    <>

      <Navbar/>
      <AuthForm/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='cart-page' element={<CartPage/>}></Route>
        <Route path='category-page' element={<CategoryPage/>}></Route>
        <Route path='product-page' element={<ProductPage/>}></Route>
      </Routes>

      <Footer/>
      
      </>
  )
}

export default App
