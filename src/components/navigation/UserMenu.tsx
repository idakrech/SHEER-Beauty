import { useSelector } from "react-redux"
import { AppState } from "../../redux"
import AuthForm from "../user-page/AuthForm"
import { Link } from "react-router-dom"
import { logOut } from "../../services/authService"

const UserMenu = () => {

  const user = useSelector((state: AppState) => state.auth.user)

  const menuItems = [
    {label: "Account details", tab: "account-details"},
    {label: "Order history", tab: "order-history"},
    {label: "Favorites", tab: "favorites"},
  ]

  return (
    user ? (
      <ul className="p-2">
        {menuItems.map((item, index) => (
          <li key={index} className="hover:bg-gray-200">
            <Link to={`/user-page/${item.tab}`}>
              {item.label}
            </Link>
          </li>
        ))}
        <li><button  onClick={() => logOut()}>Log out</button></li>
      </ul>
    ) : (
      <AuthForm/>
    )
  )
}

export default UserMenu
