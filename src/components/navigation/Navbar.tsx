import { NavLink } from "react-router-dom"
import {
  ShoppingCartOutlined,
  PersonOutline,
  Search,
} from "@mui/icons-material"
import { AppState } from "../../redux"
import { useSelector } from "react-redux"

const Navbar = ({
  onCategoryToggle,
  onUserToggle,
}: {
  onCategoryToggle: (isOpen: boolean) => void
  onUserToggle: (isOpen: boolean) => void
}) => {
  const user = useSelector((state: AppState) => state.auth.user)

  return (
    <div className="w-full bg-white font-semibold flex justify-between px-10 py-2">
      {/* Sekcja z lewej */}
      <div className="flex items-center space-x-4">
        {/* Dropdown Categories */}
        <div className="relative" onMouseEnter={() => onCategoryToggle(true)}>
          <button className="text-lg">Categories</button>
        </div>

        <NavLink to="/" className="text-lg">
          Home
        </NavLink>
      </div>

      {/* Sekcja z prawej */}
      <div className="flex items-center space-x-4">
        <div className="flex-grow flex justify-center">
          <form className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 font-normal border border-slate-100"
            />
            {/* TODO: search logic in separate file */}
            <button type="submit" className="bg-slate-100 p-2">
              <Search />
            </button>
          </form>
        </div>

        <NavLink to="/cart-page" className="text-lg">
          <ShoppingCartOutlined fontSize="small" />
        </NavLink>

        {/* Dropdown Account */}
        <div className="relative" onMouseEnter={() => onUserToggle(true)}>
          {user ? (
            <NavLink to="user-page/account-details">
              <PersonOutline />
            </NavLink>
          ) : (
            <button className="text-lg">
              <PersonOutline />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
