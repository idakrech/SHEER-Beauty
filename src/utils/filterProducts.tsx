import React from "react";
import { AppState } from "../redux";
import ProductGrid from "../components/ProductGrid"

export const filterProducts = (state: AppState) => {

    const { products } = state.products
  
    const productGrids = state.filters.map((grid) => {

      const filteredProducts = products.filter((product) => {

        const params = grid.fetchParams
  
        const matchesCategory = params.product_category ? product.category?.toLowerCase() === params.product_category.toLowerCase() : true
        const matchesTags = params.product_tags ? product.tag_list.filter((tag) => tag.toLowerCase()).some((t) => params.product_tags?.filter((pt) => pt.toLowerCase()).includes(t)) : true
        const matchesType = params.product_type ? product.product_type.toLowerCase() === params.product_type.toLowerCase() : true
        const matchesBrand = params.brand ? product.brand.toLowerCase() === params.brand.toLowerCase() : true
        const matchesRatingGreaterThan = params.rating_greater_than ? product.rating != null && product.rating >= params.rating_greater_than : true
        const matchesRatingLessThan = params.rating_less_than ? product.rating != null && product.rating <= params.rating_less_than : true
        const matchesPriceGreaterThan = params.price_greater_than ? parseFloat(product.price) >= params.price_greater_than : true
        const matchesPriceLessThan = params.price_less_than ? parseFloat(product.price) <= params.price_less_than : true
  
        return (
          matchesCategory &&
          matchesTags &&
          matchesType &&
          matchesBrand &&
          matchesRatingGreaterThan &&
          matchesRatingLessThan &&
          matchesPriceGreaterThan &&
          matchesPriceLessThan
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