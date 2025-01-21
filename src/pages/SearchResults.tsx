import { useLocation } from "react-router-dom"
import { IProduct } from "../interfaces/interfaces"
import ProductGrid from "../components/product-display/ProductGrid"

const SearchResultsPage = () => {
  const location = useLocation()
  const searchResults: IProduct[] = location.state?.searchResults || []

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {searchResults.length > 0 ? (
        <ProductGrid
          products={searchResults}
          isExpanded={true}
          maxLimit={searchResults.length}
          title="Search results"
        />
      ) : (
        <p>No products found. Try another search term.</p>
      )}
    </div>
  )
}

export default SearchResultsPage
