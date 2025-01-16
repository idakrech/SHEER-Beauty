import { useSelector } from "react-redux"
import { AppState } from "../redux"

export function useFilterProducts (type: string, category?: string) {

    const products = useSelector((state: AppState) => state.products.products)

    const typeProducts = 
        category ? products.filter((product) => product.product_type === type && product.category === category)
        : products.filter((product) => product.product_type === type)

    const uniqueTypes = Array.from(new Set(typeProducts.map((product) => product.product_type)))
    const uniqueCategories = Array.from(new Set(typeProducts.map((product) => product.category)))
    const uniqueBrands = Array.from(new Set(typeProducts.map((product) => product.brand)))
    const uniqueTags = Array.from(new Set(typeProducts.flatMap((product) => product.tag_list || [])))
    const uniqueColors = Array.from(new Set(typeProducts.flatMap((product) => product.product_colors.map((color) => color.hex_value))))

    return {uniqueTypes, uniqueCategories, uniqueBrands, uniqueTags, uniqueColors}
}