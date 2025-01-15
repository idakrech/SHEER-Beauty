import { NavLink, useNavigate } from "react-router-dom"
import {
  ShoppingCartOutlined,
  PersonOutline,
  Search,
} from "@mui/icons-material"
import { AppState } from "../../redux"
import { useSelector } from "react-redux"
import { useSearchProducts } from "../../hooks/useSearchProducts"

const Navbar = ({
  onCategoryToggle,
  onUserToggle,
}: {
  onCategoryToggle: (isOpen: boolean) => void
  onUserToggle: (isOpen: boolean) => void
}) => {
  const user = useSelector((state: AppState) => state.auth.user)

  const navigate = useNavigate()
  const products = useSelector((state: AppState) => state.products.products)
  const { searchTerm, setSearchTerm, filteredProducts } = useSearchProducts(products)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate("/search-results", { state: { searchResults: filteredProducts } })
  }

  return (
    <div className="w-full bg-white font-semibold flex justify-between px-10 py-2">
      <div className="flex items-center space-x-4">
        <div className="relative" onMouseEnter={() => onCategoryToggle(true)}>
          <button className="text-lg">Categories</button>
        </div>
        <NavLink to="/" className="text-lg">
          Home
        </NavLink>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-grow flex justify-center">
          <form className="flex" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 font-normal border border-slate-100"
            />
            <button type="submit" className="bg-slate-100 p-2">
              <Search />
            </button>
          </form>
        </div>

        <NavLink to="/cart-page" className="text-lg">
          <ShoppingCartOutlined fontSize="small" />
        </NavLink>

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
