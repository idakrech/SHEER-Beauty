import { NavLink, useNavigate } from "react-router-dom"
import {
  ShoppingCartOutlined,
  PersonOutline,
  Search,
  Menu,
  Close,
  HomeOutlined,
} from "@mui/icons-material"
import { AppState } from "../../redux"
import { useSelector } from "react-redux"
import { useSearchProducts } from "../../hooks/useSearchProducts"
import { useShoppingCart } from "../../hooks/useShoppingCart"
import { useState } from "react"

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
  const { productsQuantity } = useShoppingCart()
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    navigate("/search-results", { state: { searchResults: filteredProducts } })
  }

  return (
    <div className="fixed z-40 lg:z-50 top-[36px] w-full bg-accent font-medium text-md px-5 px-5 lg:px-20 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3 lg:w-1/3">
          <button className="md:hidden" onClick={() => onCategoryToggle(true)}>
            <Menu fontSize="medium" />
          </button>

          <div
            className="relative hidden md:block"
            onMouseEnter={() => onCategoryToggle(true)}
          >
            <button>Categories</button>
          </div>

          <NavLink to="/" className="hidden md:block">Home</NavLink>
          <NavLink to="/" className="block md:hidden"><HomeOutlined fontSize="medium"/></NavLink>
        </div>

        <div className="text-center flex items-center justify-center whitespace-nowrap px-2 lg:w-1/3">
          <h3 className="text-xl md:text-3xl text-primary font-sans uppercase font-extralight">
            ⋆˙⟡Sheer
          </h3>
          <h3 className="text-xl md:text-3xl text-primary font-serif italic">
            beauty
          </h3>
        </div>

        <div className="flex items-center gap-2 lg:w-1/3  justify-end">
          <button className="md:hidden" onClick={() => setIsSearchOpen(true)}>
            <Search />
          </button>

          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 font-normal border border-zinc-300 w-24 md:w-40 lg:w-auto"
            />
            <Search />
          </div>

          <NavLink to="/cart-page" className="relative text-lg">
            <ShoppingCartOutlined fontSize="small" />
            {productsQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-zinc-700 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                {productsQuantity}
              </span>
            )}
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

      {isSearchOpen && (
        <div className="absolute top-15 left-0 w-full bg-white shadow-md p-4 pb-6 flex flex-col items-center">
          <div className="w-full flex justify-end mb-1">
          <Close fontSize="large" onClick={() => setIsSearchOpen(false)} />
            </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 font-normal border border-slate-100 w-full"
          />
        </div>
      )}
    </div>
  )
}

export default Navbar
