/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux"
import { AppState } from "../redux"
import ProductGrid from "../components/product-display/ProductGrid"
import { useLocation } from "react-router-dom"
import { IProduct } from "../interfaces/interfaces"

const CategoryPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  // when opened from grid @ Home Page
  const gridID = searchParams.get("gridID")
  const filters = useSelector((state: AppState) => state.filters)
  const products = useSelector((state: AppState) => state.products.products)
  const grid = filters.find((grid) => grid.gridID === gridID)

  const filteredProducts = grid
  ? products.filter((product) => {
      const fetchParams = grid.fetchParams

      // Iteration of fetchParams
      return Object.entries(fetchParams).every(([key, value]) => {
        if (key === "product_tags" && Array.isArray(value)) {
          return value.some((tag) => product.tag_list.includes(tag))
        } else if (key === "rating_greater_than" && typeof value === "number") {
          return product.rating != null && product.rating > value
        } else if (key === "rating_less_than" && typeof value === "number") {
          return product.rating != null && product.rating < value
        } else if (key === "price_greater_than" && typeof value === "number") {
          return parseFloat(product.price) > value
        } else if (key === "price_less_than" && typeof value === "number") {
          return parseFloat(product.price) < value
        } else {
          return product[key as keyof IProduct] === value
        }
      })
    })
  : []

  // when opened from categories menu
  const type = searchParams.get("type")
  const category = searchParams.get("category")
  
  const typeProducts = useSelector((state: AppState) =>
    state.products.products.filter((product) => product.product_type === type)
  )
  const categoryProducts = typeProducts.filter(
    (product) => product.category == category
  )
  
  return (
    <ProductGrid
      products={
        gridID != null
          ? filteredProducts
          : category
          ? categoryProducts
          : typeProducts
      }
      isExpanded={true}
    />
  )
}
export default CategoryPage
