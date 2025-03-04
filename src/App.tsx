import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import CartPage from "./pages/CartPage"
import Navbar from "./components/navigation/Navbar"
import Footer from "./components/Footer"
import CategoryPage from "./pages/CategoryPage"
import ProductPage from "./pages/ProductPage"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { listenToAuth } from "./helpers/authListener"
import { AppDispatch, AppState } from "./redux"
import { userDataService } from "./services/userDataService"
import { setProducts as setFavProducts } from "./redux/favoritesSlice"
import { setProducts as setCartProducts } from "./redux/cartSlice"
import { setUserFirstName } from "./redux/authSlice"
import UserPage from "./pages/UserPage"
import { IProduct } from "./interfaces/interfaces"
import CategoryList from "./components/navigation/CategoryList"
import useFetchProducts from "./hooks/useFetchProducts"
import UserMenu from "./components/navigation/UserMenu"
import SearchResultsPage from "./pages/SearchResults"
import PromotedProductsPage from "./pages/PromotedProductsPage"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Disclaimer from "./components/Disclaimer"

//TODO: format all errors into more user friendly phrases
//TODO: catch invalid http and display "No such page found :("
//BIG: hide .env values somehow (backend?)
//STYLE: change Vite icon by Website name (in browser tab) into make up icon
//TODO: what causes hundreds of "Third party cookies will be blocked" in console?

const stripePromise = loadStripe(
  "pk_test_51QrJt3HbWFF7jHYQueZbeHhnBjAiRHhcGn732ltRiXLDlybxn46k5cv6KsHvoidLavihavqIGDqrY9oReG2JE4yH00Q5J0ivAz"
)

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: AppState) => state.auth.user)
  const cart = useSelector((state: AppState) => state.cart.products)
  const favorites = useSelector((state: AppState) => state.favorites.products)
  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState<boolean>(false)
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false)

  // useFetchProducts()

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
                    (userProduct: { product: IProduct; quantity: number }) =>
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

            if (userData.address?.name) {
              dispatch(setUserFirstName(userData.address.name))
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
      <Elements stripe={stripePromise}>
        <Disclaimer />
        <Navbar
          onCategoryToggle={setShowCategoryDropdown}
          onUserToggle={setShowUserDropdown}
        />
        {showCategoryDropdown && (
          <div
            className="bg-white shadow-md border border-zinc-300"
            onMouseEnter={() => setShowUserDropdown(false)}
            onMouseLeave={() => setShowCategoryDropdown(false)}
          >
            <CategoryList />
          </div>
        )}
        {showUserDropdown && (
          <div
            className="w-full flex justify-end"
            onMouseEnter={() => setShowCategoryDropdown(false)}
            onMouseLeave={() => setShowUserDropdown(false)}
          >
            <UserMenu />
          </div>
        )}
        <div className="max-w-[1280px] mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="cart-page" element={<CartPage />}></Route>
            <Route path="category-page" element={<CategoryPage />}></Route>
            <Route path="product-page" element={<ProductPage />}></Route>
            <Route path="user-page/:tab" element={<UserPage />}></Route>
            <Route
              path="search-results"
              element={<SearchResultsPage />}
            ></Route>
            <Route path="promoted" element={<PromotedProductsPage />}></Route>
          </Routes>
        </div>

        <Footer />
      </Elements>
    </>
  )
}

export default App
