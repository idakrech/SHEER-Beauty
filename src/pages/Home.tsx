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
            <div
              className="w-full h-96 flex relative bg-cover bg-center bg-no-repeat items-center justify-center border border-zinc-300"
              style={{ backgroundImage: `url(${imageMap[grid.image]})` }}
            >
              <div className="absolute w-full h-full z-10 bg-gradient-to-t from-accent to-transparent"></div>

              <div className="w-auto h-auto flex flex-col justify-center items-center z-20 gap-0">
                <h3 className="text-7xl text-primary italic font-serif">
                  {grid.title}
                </h3>
                <h3 className="text-xl uppercase font-extralight text-primary tracking-wider">{grid.subtitle}</h3>
              </div>
            </div>
            <div key={grid.title} className="bg-primary p-3">
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
