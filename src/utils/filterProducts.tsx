/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppState } from "../redux"
import ProductGrid from "../components/ProductGrid"

export const filterProducts = (state: AppState) => {

    const { products } = state.products
  
    const productGrids = state.filters.map((grid) => {

      const fetchParams = grid.fetchParams
      const createdAtParam = grid.createdAt

      const filteredProducts = products.filter((product) => {

        const matchesCategory = fetchParams.product_category ? product.category?.toLowerCase() === fetchParams.product_category.toLowerCase() : true
        const matchesTags = fetchParams.product_tags ? product.tag_list.filter((tag) => tag.toLowerCase()).some((t) => fetchParams.product_tags?.filter((pt) => pt.toLowerCase()).includes(t)) : true
        const matchesType = fetchParams.product_type ? product.product_type.toLowerCase() === fetchParams.product_type.toLowerCase() : true
        const matchesBrand = fetchParams.brand ? product.brand.toLowerCase() === fetchParams.brand.toLowerCase() : true
        const matchesRatingGreaterThan = fetchParams.rating_greater_than ? product.rating != null && product.rating >= fetchParams.rating_greater_than : true
        const matchesRatingLessThan = fetchParams.rating_less_than ? product.rating != null && product.rating <= fetchParams.rating_less_than : true
        const matchesPriceGreaterThan = fetchParams.price_greater_than ? parseFloat(product.price) >= fetchParams.price_greater_than : true
        const matchesPriceLessThan = fetchParams.price_less_than ? parseFloat(product.price) <= fetchParams.price_less_than : true

        let isNewer: boolean = true

        if (matchesCategory &&
          matchesTags &&
          matchesType &&
          matchesBrand &&
          matchesRatingGreaterThan &&
          matchesRatingLessThan &&
          matchesPriceGreaterThan &&
          matchesPriceLessThan && createdAtParam) {
            isNewer = new Date(createdAtParam).getTime() <= new Date(product.created_at).getTime()
          }

        return (
          matchesCategory &&
          matchesTags &&
          matchesType &&
          matchesBrand &&
          matchesRatingGreaterThan &&
          matchesRatingLessThan &&
          matchesPriceGreaterThan &&
          matchesPriceLessThan &&
          isNewer
        )
      })

      return (
        <div key={grid.gridID}>
          <h2>{grid.title}</h2>
          <ProductGrid products={filteredProducts} maxLimit={6} isExpanded={false} />
        </div>
      )
    })
  
    return <div>{productGrids}</div>;
  }