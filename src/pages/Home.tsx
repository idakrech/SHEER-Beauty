import ProductGrid from "../components/product-display/ProductGrid"
import { gridConfig } from "../config/gridConfig"
import { IFilterState } from "../redux/filterSlice"
import { useSelector } from "react-redux"
import { AppState } from "../redux"
import { useGridProducts } from "../hooks/useGridProducts"

const Home = () => {
  const isInitialized = useSelector(
    (state: AppState) => state.products.isInitialized
  )

  const gridProducts = useGridProducts(isInitialized)

  return (
    <>
      {gridConfig.map((grid) => {
        const products = gridProducts[grid.title] || []
        const filters: IFilterState = {
          type: grid.type,
          category: grid.category,
          selectedBrands: grid.brand ? [grid.brand] : [],
          selectedColors: [],
          selectedTags: grid.tags,
          priceRange: grid.priceRange
        }

        return (
          <div key={grid.title}>
            <ProductGrid
              products={products}
              isExpanded={false}
              maxLimit={9}
              title={grid.title}
              filters={filters}
            />
          </div>
        )
      })}
    </>
  )
}
export default Home
