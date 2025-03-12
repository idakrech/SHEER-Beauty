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

  const dispatch = useDispatch()

  useEffect(() => {
    if (type) {
      dispatch(setType(type))
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
    <div>
      {isInitialized ? (
        <div className="flex items-start">
          {type.length !== 0 && <Sidebar type={type} category={category} />}
          <div className="flex">
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
          </div>
        </div>
      ) : (
        <InitializationSpinner />
      )}
    </div>
  )
}

export default CategoryPage
