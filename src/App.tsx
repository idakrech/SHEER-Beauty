/* eslint-disable @typescript-eslint/no-unused-vars */
import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import CartPage from "./pages/CartPage"
import Navbar from "./components/navigation/Navbar"
import Footer from "./components/Footer"
import CategoryPage from "./pages/CategoryPage"
import ProductPage from "./pages/ProductPage"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { listenToAuth } from "./helpers/authListener"
import { AppDispatch, AppState } from "./redux"
import AuthForm from "./components/user-page/AuthForm"
import { userDataService } from "./services/userDataService"
import { setProducts as setFavProducts } from "./redux/favoritesSlice"
import { setProducts as setCartProducts} from "./redux/cartSlice"
import { setUserFirstName } from "./redux/authSlice"
import AddressForm from "./components/user-page/AddressForm"
import UserPage from "./pages/UserPage"
import { IProduct } from "./interfaces/interfaces"

// NEXT UP: three libraries: 
// - address validation
// - phone country codes (api?)

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: AppState) => state.auth.user)
  const cart = useSelector((state: AppState) => state.cart.products)
  const favorites = useSelector((state: AppState) => state.favorites.products)

  useEffect(() => {
    dispatch(listenToAuth())
  }, [dispatch])

  useEffect(() => {
    const lastUpdate = new Date().getTime()

    if (user) {
      const uid = user.uid
      localStorage.setItem(
        "beautyWebshop_appState",
        JSON.stringify({
          lastUpdate,
          uid,
        })
      )
    } else {
      localStorage.setItem(
        "beautyWebshop_appState",
        JSON.stringify({
          lastUpdate,
          cart,
          favorites,
        })
      )
    }
  }, [user, cart, favorites])

  useEffect(() => {
    if (!user) return

    const fetchUserData = async () => {
      if (user) {
        try {
          const userData = await userDataService.getUserData(user.uid)

          if (userData) {
            if (userData.favorites) {
              dispatch(setFavProducts(userData.favorites))

              const localFavorites = favorites.filter(
                (fav) => !userData.favorites.includes(fav)
              )

              for (const fav of localFavorites) {
                await userDataService.addFavorite(user.uid, fav)
              }
            }

            if (userData.cart) {
              dispatch(setCartProducts(userData.cart))

              const localCartProducts = cart.filter(
                (stateProduct) =>
                  !userData.cart.some(
                    (userProduct: { product: IProduct, quantity: number }) =>
                      userProduct.product.id === stateProduct.product.id
                  )
              )

              for (const localProduct of localCartProducts) {
                await userDataService.addToCart(user.uid, {
                  product: localProduct.product,
                  quantity: localProduct.quantity,
                })
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
        <Route path="user-page/:tab" element={<UserPage />}></Route>
      </Routes>

      <Footer />
    </>
  )
}

export default App
