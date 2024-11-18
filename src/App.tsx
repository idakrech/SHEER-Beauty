/* eslint-disable @typescript-eslint/no-unused-vars */
import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import CartPage from "./pages/CartPage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import CategoryPage from "./pages/CategoryPage"
import ProductPage from "./pages/ProductPage"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { listenToAuth } from "./helpers/authListener"
import { AppDispatch, AppState } from "./redux"
import AuthForm from "./components/AuthForm"
import { userDataService } from "./services/userDataService"
import { setProductIDs } from "./redux/favoritesSlice"
import { setProducts } from "./redux/cartSlice"
import AddressForm from "./components/AddressForm"
import { setUserFirstName } from "./redux/authSlice"

let initialRender = true

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: AppState) => state.auth.user)
  const cart = useSelector((state: AppState) => state.cart.products)
  const favorites = useSelector((state: AppState) => state.favorites.productIDs)

  useEffect(() => {
    dispatch(listenToAuth())
  }, [dispatch])

  useEffect(() => {
    if (initialRender) {
      initialRender = false
      return
    }

    const lastUpdate = new Date().getTime()

    localStorage.setItem(
      "beautyWebshop_appState",
      JSON.stringify({
        lastUpdate,
        user,
        cart,
        favorites,
      })
    )
  }, [user, cart])

  useEffect(() => {
    
    if (!user) return

    const fetchUserData = async () => {
      if (user) {
        try {
          const userData = await userDataService.getUserData(user.uid)
          
          if (userData) {

            if (userData.favorites) {
              dispatch(setProductIDs(userData.favorites))

              const localFavorites = favorites.filter(
                (fav) => !userData.favorites.includes(fav)
              )
  
              for (const fav of localFavorites) {
                await userDataService.addFavorite(user.uid, fav)
              }
            }

            if (userData.cart) {
              dispatch(setProducts(userData.cart))

              const localCartProducts = cart.filter((stateProduct) => !userData.cart.some((userProduct: {id: number, quantity: number}) => userProduct.id === stateProduct.id))

              for (const product of localCartProducts) {
                await userDataService.addToCart(user.uid, {id: product.id, quantity: product.quantity})
              }
            }

            if (userData.address.firstName) {
              dispatch(setUserFirstName(userData.address.firstName))
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      }
    }

    fetchUserData()
  }, [user])

  return (
    <>
      <Navbar />
      <AuthForm />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="cart-page" element={<CartPage />}></Route>
        <Route path="category-page" element={<CategoryPage />}></Route>
        <Route path="product-page" element={<ProductPage />}></Route>
        <Route path="user-page" element={<AddressForm/>}></Route>
      </Routes>

      <Footer />
    </>
  )
}

export default App
