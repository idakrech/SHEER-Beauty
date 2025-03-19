import ProductGrid from "../components/product-display/ProductGrid"
import { gridConfig, imageMap } from "../config/gridConfig"
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
    <div>
      {/* <div className="relative flex my-2"> */}
      {/* <img src={modelImg} className="h-80 border border-gray-500"/>
        <div className="h-80 w-full absolute border border-gray-500 bg-accent/25 translate-y-2 translate-x-2 w-[calc(100%-0.75rem)]">
        <h3 className="text-2xl font-serif italic text-dark p-5">Cotton Candy moods</h3>
        </div> */}

      {/* </div> */}

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
            <div className="w-full h-80 my-2 relative flex">
              <div className="overflow-hidden w-full">
                <img
                  src={imageMap[grid.images[0]]}
                  className={`${grid.imgStyle}`}
                />
              </div>
              <div
                className={`absolute flex items-center justify-between pl-20 pr-5 py-5 ${grid.imgOverlayStyle}`}
              >
                <h3 className="text-2xl font-serif italic text-dark p-5">
                  {grid.title}
                </h3>
                {/* <div className="h-full w-full flex justify-end relative"> */}
                  <img
                    src={imageMap[grid.images[1]]}
                    className="h-full border border-zinc-500"
                  />
                {/* </div>
                <div className="absolute w-48 h-full border border-gray-500 bg-accent/25"></div> */}
              </div>
            </div>
            <div key={grid.title}>
              <ProductGrid
                products={products}
                isExpanded={false}
                maxLimit={3}
                title={grid.title}
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
