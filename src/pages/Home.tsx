import ProductGrid from "../components/product-display/ProductGrid"
import { gridConfig, imageMap } from "../config/gridConfig"
import { IFilterState } from "../redux/filterSlice"
import { useSelector } from "react-redux"
import { AppState } from "../redux"
import { useGridProducts } from "../hooks/useGridProducts"
import WebsiteError from "../components/WebsiteError"

const Home = () => {
  const isInitialized = useSelector(
    (state: AppState) => state.products.isInitialized
  )

  const gridProducts = useGridProducts(isInitialized)

  const allEmpty = Object.values(gridProducts).every(
    (products) => products.length === 0
  )

  if (allEmpty) {
    return <WebsiteError/>
  }

  return (
    <div className="max-w-screen-xl mx-auto -mt-2 md:mt-0">
      {gridConfig.map((grid) => {
        const products = gridProducts[grid.title] || []
        const filters: IFilterState = {
          type: grid.type,
          category: grid.category,
          selectedBrands: grid.brand ? [grid.brand] : [],
          selectedColors: [],
          selectedTags: grid.tags,
          priceRange: grid.priceRange,
        }

        return (
          <div key={grid.title}>
            <div
              className="w-full h-[50vh] lg:h-96 flex relative bg-cover bg-center bg-no-repeat items-center justify-center"
              style={{ backgroundImage: `url(${imageMap[grid.image]})` }}
            >
              <div className="absolute w-full h-full z-10 bg-gradient-to-t from-accent to-transparent"></div>

              <div className="w-auto h-auto flex flex-col justify-center items-center z-20 gap-0 p-6 md:p-10">
                <h3 className="text-4xl md:text-6xl lg:text-7xl text-primary italic font-serif">
                  {grid.title}
                </h3>
                <h3 className="text-sm md:text-lg lg:text-xl uppercase font-extralight text-primary tracking-wider">{grid.subtitle}</h3>
              </div>
            </div>
            <div key={grid.title} className="bg-primary p-4 md:p-6">
              <ProductGrid
                products={products}
                isExpanded={false}
                maxLimit={3}
                title={grid.title + " " + grid.subtitle}
                filters={filters}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default Home
