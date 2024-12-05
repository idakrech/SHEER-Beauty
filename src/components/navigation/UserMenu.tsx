import { useSelector } from "react-redux"
import { AppState } from "../../redux"
import AuthForm from "../user-page/AuthForm"
import { Link } from "react-router-dom"

const UserMenu = () => {

  const user = useSelector((state: AppState) => state.auth.user)

  const menuItems = [
    {label: "Account details", tab: "account-details"},
    {label: "Order history", tab: "order-history"},
    {label: "Favorites", tab: "favorites"},
    {label: "Log out", tab: "log-out"}
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
      </ul>
    ) : (
      <AuthForm/>
    )
  )
}

export default UserMenu
