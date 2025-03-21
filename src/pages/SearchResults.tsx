import { useLocation } from "react-router-dom"
import { IProduct } from "../interfaces/interfaces"
import ProductGrid from "../components/product-display/ProductGrid"

const SearchResultsPage = () => {
  const location = useLocation()
  const searchResults: IProduct[] = location.state?.searchResults || []

  return (
    <div className="bg-white p-4 w-full border border-zinc-300 my-4 flex flex-col flex-1 justify-center items-center">
      <h1 className="text-xl font-serif font-bold my-5 border-b border-zinc-300 pb-1">Search Results</h1>
      {searchResults.length > 0 ? (
        <ProductGrid
          products={searchResults}
          isExpanded={true}
          maxLimit={searchResults.length}
          title="Search results"
        />
      ) : (
        <div className="flex text-center justify-center items-center mt-5 w-full" style={{ height: "45vh" }}>
        <p>{`No such product found :(`}</p>
        </div>
      )}
    </div>
  )
}

export default SearchResultsPage
