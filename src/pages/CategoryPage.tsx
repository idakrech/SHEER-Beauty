import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetFilters, setType, toggleCategory } from "../redux/filterSlice"
import { useLocation } from "react-router-dom"
import { useFilterProducts } from "../hooks/useFilterProducts"
import { AppState } from "../redux"
import Sidebar from "../components/Sidebar"
import ProductGrid from "../components/product-display/ProductGrid"
import InitializationSpinner from "../components/product-display/InitializationSpinner"
import TuneIcon from "@mui/icons-material/Tune"

const CategoryPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const type = searchParams.get("type") || ""
  const category = searchParams.get("category") || ""

  const isInitialized = useSelector(
    (state: AppState) => state.products.isInitialized
  )
  const error = useSelector((state: AppState) => state.products.error)

  const dispatch = useDispatch()

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)

  useEffect(() => {
    if (type) {
      dispatch(setType(type))
      dispatch(toggleCategory(""))
    }
    if (category) {
      dispatch(toggleCategory(category))
    }
  }, [type, category, dispatch])

  useEffect(() => {
    return () => {
      dispatch(resetFilters())
    }
  }, [dispatch])

  const filters = useSelector((state: AppState) => state.productFilter)
  const { filteredProducts } = useFilterProducts(filters)

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center w-full md:w-2/3 h-[50vh] bg-white border border-zinc-300 my-5 p-5 md:p-0">
        <h3 className="font-serif sont-semibold">
          We are sorry, an error has occured. Please try again later 💕
        </h3>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      {isInitialized ? (
        <div className="flex items-start w-full h-full">
          {type.length !== 0 && (
            <Sidebar
              type={type}
              category={category}
              isOpen={isSidebarOpen}
              onClose={toggleSidebar}
            />
          )}
          <div className="flex flex-col w-full h-full mt-5">
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleSidebar}
                className="flex items-center gap-1 p-2 border border-gray-300 rounded-md mb-2 bg-accent/50 hover:bg-accent"
              >
                <TuneIcon /> <span>Filters</span>
              </button>
            </div>
            <h1 className="underline">{`> ${
              type.charAt(0).toUpperCase() + type.slice(1)
            }${
              category
                ? " > " + category.charAt(0).toUpperCase() + category.slice(1)
                : ""
            }`}</h1>

            {filteredProducts.length ? (
              <ProductGrid
                products={filteredProducts}
                isExpanded={true}
                title={
                  type && !category
                    ? type.charAt(0).toUpperCase() + type.slice(1)
                    : type && category
                    ? `${type.charAt(0).toUpperCase() + type.slice(1)}: ${
                        category.charAt(0).toUpperCase() + category.slice(1)
                      }`
                    : ""
                }
              />
            ) : (
              <div
                className="w-full h-full bg-primary border border-zinc-300 flex flex-col justify-center items-center p-3 m-5"
                style={{ height: "45vh" }}
              >
                <p className="font-serif font-semibold text-center">
                  Oops! No matches found. Try modifying the filters 💖
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <InitializationSpinner type="plural" />
      )}
    </div>
  )
}

export default CategoryPage
