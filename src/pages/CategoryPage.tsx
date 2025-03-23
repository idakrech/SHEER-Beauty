import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetFilters, setType, toggleCategory } from "../redux/filterSlice"
import { useLocation } from "react-router-dom"
import { useFilterProducts } from "../hooks/useFilterProducts"
import { AppState } from "../redux"
import Sidebar from "../components/Sidebar"
import ProductGrid from "../components/product-display/ProductGrid"
import InitializationSpinner from "../components/product-display/InitializationSpinner"

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

  return (
    <div className="w-full h-full">
      {isInitialized ? (
        <div className="flex items-start w-full h-full">
          {type.length !== 0 && <Sidebar type={type} category={category} />}
          <div className="flex flex-col w-full h-full mt-5">
            <h1 className="underline">{`> ${type.charAt(0).toUpperCase() + type.slice(1)}${category ? " > " + category.charAt(0).toUpperCase() + category.slice(1) : ""}`}</h1>
            
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
              <div className="w-full h-full bg-primary border border-zinc-300 flex flex-col justify-center items-center p-3 m-5" style={{ height: "45vh" }}>
              <p className="font-serif font-semibold text-center">Oops! No matches found. Try modifying the filters 💖</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <InitializationSpinner />
      )}
      {error && (
        <div className="bg-white p-4 w-full border border-zinc-300 my-4">
          <h3 className="font-serif sont-semibold">
            We are sorry, an error has occured. Please try again later 💕
          </h3>
        </div>
      )}
    </div>
  )
}

export default CategoryPage
