import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../../redux"
import AuthForm from "../user-page/AuthForm"
import { Link } from "react-router-dom"
import { setProducts as setCartProducts } from "../../redux/cartSlice"
import { setProducts as setFavProducts } from "../../redux/favoritesSlice"
import { logOut } from "../../services/authService"

const UserMenu = () => {
  const user = useSelector((state: AppState) => state.auth.user)

  const dispatch = useDispatch<AppDispatch>()

  const menuItems = [
    { label: "Account details", tab: "account-details" },
    { label: "Order history", tab: "order-history" },
    { label: "Favorites", tab: "favorites" },
  ]

  const handleLogout = async () => {
    try {
      await logOut()
      dispatch(setFavProducts([]))
      dispatch(setCartProducts([]))
      console.log("User logged out")
    } catch (error) {
      alert(`An error occured: ${error}`)
    }
  }

  return (
    <div className="w-auto shadow-md bg-white border border-zinc-300 p-3 flex flex-col items-end">
      {user ? (
        <ul className="p-2">
          {menuItems.map((item, index) => (
            <li key={index} className="hover:text-dark text-end border-b border-zinc-300 py-1">
              <Link to={`/user-page/${item.tab}`}>{item.label}</Link>
            </li>
          ))}
          <li className="hover:text-dark text-end font-bold pt-1"> 
            <button onClick={() => handleLogout()}>Log out</button>
          </li>
        </ul>
      ) : (
        <AuthForm />
      )}
    </div>
  )
}

export default UserMenu
