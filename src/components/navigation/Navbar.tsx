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
  const products = useSelector((state: AppState) => state.products.products)
  const { searchTerm, setSearchTerm, filteredProducts } =
    useSearchProducts(products)
  const navigate = useNavigate()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    navigate("/search-results", { state: { searchResults: filteredProducts } })
  }

  return (
    <div className="fixed z-10 top-[35px] w-full bg-accent font-medium text-md text-gray-600 flex justify-between px-10 py-3">
      <div className="flex items-center space-x-4">
        <div className="relative" onMouseEnter={() => onCategoryToggle(true)}>
          <button>Categories</button>
        </div>
        <NavLink to="/">Home</NavLink>
      </div>

      <div className="flex items-center">
        <h3 className="flex items-center text-3xl text-primary font-sans uppercase font-extralight">
        ⋆˙⟡ Sheer
        </h3>
        <h3 className="flex items-center text-3xl text-primary font-serif italic">
          beauty
        </h3>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 font-normal border border-slate-100 w-full"
          />
          <Search />
        </div>

        {/* TODO: add items count on the cart icon corner */}
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
