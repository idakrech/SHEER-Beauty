import { useSelector } from "react-redux"
import { IFilterState } from "../redux/filterSlice"
import { AppState } from "../redux"

export function useFilterProducts (filters: IFilterState) {

  const products = useSelector((state: AppState) => state.products.products)
    
  const filteredProducts = products.filter((product) => {
    const matchesType = filters.type ? product.product_type?.toLowerCase() === filters.type.toLowerCase() : true
    const matchesCategory = filters.category
      ? product.category?.toLowerCase() === filters.category.toLowerCase()
      : true
    const matchesBrands =
      filters.selectedBrands.length === 0 ||
      filters.selectedBrands.includes(product.brand?.toLowerCase())
    const matchesTags =
      filters.selectedTags.length === 0 ||
      filters.selectedTags.some((tag) =>
        product.tag_list?.map(t => t.toLowerCase()).includes(tag.toLowerCase())
      )
    const matchesPrice =
      parseFloat(product?.price) >= filters.priceRange.min &&
      parseFloat(product?.price) <= filters.priceRange.max

    return matchesType && matchesCategory && matchesBrands && matchesTags && matchesPrice
  })

    return {filteredProducts}
}