import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import ProductPage from './pages/ProductPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='cart-page' element={<CartPage/>}></Route>
        <Route path='product-page' element={<ProductPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
