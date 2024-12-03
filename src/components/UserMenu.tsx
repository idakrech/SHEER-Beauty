import { useSelector } from "react-redux"
import { AppState } from "../redux"
import AuthForm from "./AuthForm"

const UserMenu = () => {

  const user = useSelector((state: AppState) => state.auth.user)

  const menuItems: string[] = [
    "Account details",
    "Order history",
    "Favorites",
    "Log out",
  ]

  return (
    user ? (
    <ul className="p-2">
      {menuItems.map((item, index) => (
        <li key={index} className="hover:bg-gray-200">
          <p>{item}</p>
        </li>
      ))}
    </ul>
    ) : (
        <AuthForm/>
    )
  )
}

export default UserMenu
