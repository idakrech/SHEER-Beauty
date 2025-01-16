import { useSelector } from "react-redux"
import { IFilterState } from "../redux/filterSlice"
import { AppState } from "../redux"

export function useFilterProducts (filters: IFilterState) {

  const products = useSelector((state: AppState) => state.products.products)
    
    const filteredProducts = products.filter((product) => {
        return (
          (filters.selectedBrands.length === 0 || filters.selectedBrands.includes(product.brand)) &&
          (filters.selectedTags.length === 0 || product.tag_list.some((tag) => filters.selectedTags.includes(tag))) &&
          (filters.selectedColors.length === 0 ||
            product.product_colors.some((color) => filters.selectedColors.includes(color.hex_value))) &&
          parseFloat(product.price) >= filters.priceRange.min &&
          parseFloat(product.price) <= filters.priceRange.max 
          //TODO: include categories in filtering
          // &&
          // product.product_type === type &&
          // (!category || product.category === category)
        )
      })

    return {filteredProducts}
}