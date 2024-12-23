import { NavLink } from "react-router-dom"
import { useState } from "react"
import UserMenu from "./UserMenu"
import { ShoppingCartOutlined, PersonOutline, Search } from "@mui/icons-material"

const Navbar = ({ onCategoryToggle }: {onCategoryToggle: (isOpen: boolean) => void}) => {
  
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false)

  return (
    <div className="w-full bg-white font-semibold flex justify-between px-10 py-2">
      {/* Sekcja z lewej */}
      <div className="flex items-center space-x-4">

        {/* Dropdown Categories */}
        <div
          className="relative"
          onMouseEnter={() => onCategoryToggle(true)}
        >
          <button className="text-lg">Categories</button>
        </div>

        <NavLink to="/" className="text-lg">
          Home
        </NavLink>
      </div>

      {/* Środkowa sekcja - wyszukiwarka */}
      

      {/* Sekcja z prawej */}
      <div className="flex items-center space-x-4">

      <div className="flex-grow flex justify-center">
        <form className="flex">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 font-normal border border-slate-100"
          />
          <button
            type="submit"
            className="bg-slate-100 p-2"
          >
            <Search/>
          </button>
        </form>
      </div>

        <NavLink to="/cart-page" className="text-lg">
        <ShoppingCartOutlined fontSize="small"/>
        </NavLink>

        {/* Dropdown Account */}
        <div
          className="relative"
          onMouseEnter={() => setShowUserDropdown(true)}
          onMouseLeave={() => setShowUserDropdown(false)}
        >
          <button className="text-lg"><PersonOutline/></button>
          {showUserDropdown && (
            <div className="absolute bg-white text-black rounded shadow-lg mt-2">
              <UserMenu />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
