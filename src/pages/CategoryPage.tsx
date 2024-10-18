/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux"
import { AppState } from "../redux"
import ProductGrid from "../components/ProductGrid"
import { useLocation } from "react-router-dom"
import useFetchProducts from "../hooks/useFetchProducts"

const CategoryPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  // when opened from grid @ Home
  const gridID = searchParams.get("gridID")
  const filters = useSelector((state: AppState) => state.filters)
  const products = useSelector((state: AppState) => state.products.products)
  const grid = filters.find((grid) => grid.gridID === gridID)
  const filteredProducts = products.filter((product) =>
    grid?.productIDs.includes(product.id)
  )

  // when opened from categories menu
  const type = searchParams.get("type")
  const category = searchParams.get("category")
  useFetchProducts([
    {
      product_type: type || undefined,
      product_category: type && category ? category : undefined
    }
  ])
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
