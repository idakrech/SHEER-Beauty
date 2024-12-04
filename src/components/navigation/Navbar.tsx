import { NavLink } from "react-router-dom"
import { useState } from "react"
import CategoryList from "./CategoryList" // Import komponentu kategorii
import UserMenu from "./UserMenu"

const Navbar = () => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false)
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false)

  return (
    <div className="w-full bg-gray-800 text-white flex items-center px-4 py-2">
      {/* Sekcja z lewej */}
      <div className="flex items-center space-x-4">

        {/* Dropdown Categories */}
        <div
          className="relative"
          onMouseEnter={() => setShowCategoryDropdown(true)}
          onMouseLeave={() => setShowCategoryDropdown(false)}
        >
          <button className="text-lg font-bold">Categories</button>
          {showCategoryDropdown && (
            <div className="absolute bg-white text-black rounded shadow-lg mt-2">
              <CategoryList />
            </div>
          )}
        </div>

        <NavLink to="/" className="text-lg font-bold">
          Home
        </NavLink>
      </div>

      {/* Środkowa sekcja - wyszukiwarka */}
      <div className="flex-grow flex justify-center">
        <form className="flex">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-l border border-gray-300"
          />
          <button
            type="submit"
            className="bg-blue-600 p-2 rounded-r text-white hover:bg-blue-700"
          >
            🔍
          </button>
        </form>
      </div>

      {/* Sekcja z prawej */}
      <div className="flex items-center space-x-4">

        <NavLink to="/cart-page" className="text-lg font-bold">
          Cart
        </NavLink>

        {/* Dropdown Account */}
        <div
          className="relative"
          onMouseEnter={() => setShowUserDropdown(true)}
          onMouseLeave={() => setShowUserDropdown(false)}
        >
          <button className="text-lg font-bold">Account</button>
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
