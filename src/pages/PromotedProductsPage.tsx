import { useLocation } from "react-router-dom"
import { useFilterProducts } from "../hooks/useFilterProducts"
import ProductGrid from "../components/product-display/ProductGrid"
import { IFilterState } from "../redux/filterSlice"
import { useSelector } from "react-redux"
import { AppState } from "../redux"
import InitializationSpinner from "../components/product-display/InitializationSpinner"

const PromotedProductsPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const isInitialized = useSelector(
    (state: AppState) => state.products.isInitialized
  )
  const error = useSelector((state: AppState) => state.products.error)

  const filters: IFilterState = {
    type: searchParams.get("type") || "",
    category: searchParams.get("category") || "",
    selectedBrands: searchParams.getAll("brand"),
    selectedTags: searchParams.getAll("tag"),
    selectedColors: searchParams.getAll("color"),
    priceRange: {
      min: parseFloat(searchParams.get("price_min") || "0"),
      max: parseFloat(searchParams.get("price_max") || "Infinity"),
    },
  }

  const title = searchParams.get("title") || "Products"

  const { filteredProducts } = useFilterProducts(filters)

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center w-full md:w-2/3 h-[50vh] bg-white border border-zinc-300 my-5 p-5 md:p-0">
        <h3 className="font-serif sont-semibold text-center">
          We are sorry, an error has occured. Please try again later 💕
        </h3>
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center items-center">
      {isInitialized ? (
        <div className="bg-white p-4 w-full border border-zinc-300 my-4 flex flex-col justify-center items-center">
          <h3 className="text-xl font-serif font-bold my-5 border-b border-zinc-300 pb-1 text-center">
            {title}
          </h3>
          <ProductGrid
            products={filteredProducts}
            isExpanded={true}
            title={title}
          />
        </div>
      ) : (
        <InitializationSpinner type="plural" />
      )}
    </div>
  )
}

export default PromotedProductsPage
