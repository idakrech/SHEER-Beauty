/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppState } from "../redux"
import ProductGrid from "../components/ProductGrid"

export const filterProducts = (state: AppState) => {

    const { products } = state.products
    
    const productGrids = state.filters.map((grid) => {

      const productIDs = grid.productIDs
      const createdAtParam = grid.createdAt

      const filteredProducts = products.filter((product) => {
        const isIncluded = productIDs.includes(product.id)
        let isNewer: boolean = true
        if (isIncluded && createdAtParam){
        isNewer = new Date(createdAtParam).getTime() <= new Date(product.created_at).getTime()
        }
        return isNewer && isIncluded
      })
      console.log("Filtered products", filteredProducts)
      return (
        <div key={grid.gridID}>
          <h2>{grid.title}</h2>
          <ProductGrid products={filteredProducts} maxLimit={6} isExpanded={false} />
        </div>
      )
    })
  
    return <div>{productGrids}</div>;
  }