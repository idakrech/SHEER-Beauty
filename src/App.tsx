import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    
    <>

      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='cart-page' element={<CartPage/>}></Route>
        {/* <Route path='product-page/:id' element={<ProductPage/>}></Route> */}
      </Routes>

      <Footer/>
      
      </>
  )
}

export default App
