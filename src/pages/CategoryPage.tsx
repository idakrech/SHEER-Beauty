import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setType, setCategory } from "../redux/filterSlice"
import { useLocation } from "react-router-dom"
import { useFilterProducts } from "../hooks/useFilterProducts"
import { AppState } from "../redux"
import Sidebar from "../components/Sidebar"
import ProductGrid from "../components/product-display/ProductGrid"

const CategoryPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const type = searchParams.get("type") || ""
  const category = searchParams.get("category") || ""

  const dispatch = useDispatch()

  useEffect(() => {
    if (type) {
      dispatch(setType(type))
    }
    if (category) {
      dispatch(setCategory(category))
    }
  }, [type, category, dispatch])

  const filters = useSelector((state: AppState) => state.productFilter)
  const { filteredProducts } = useFilterProducts(filters)

  return (
    <div className="flex">
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
  )
}

export default CategoryPage
