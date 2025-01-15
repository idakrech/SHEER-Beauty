import { useMemo, useState } from "react"
import { IProduct } from "../interfaces/interfaces"

//TODO: make search dynamic
export function useSearchProducts(products: IProduct[]) {
  const [searchTerm, setSearchTerm] = useState<string>("")

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products

    const normalizedSearchTerm = searchTerm.toLowerCase()
    const searchKeywords = normalizedSearchTerm.split(" ").filter(Boolean)

    return products.filter((product) => {
      const searchableFields = [
        product.name?.toLowerCase() || "",
        product.brand?.toLowerCase() || "",
        product.product_type?.toLowerCase() || "",
        ...(product.tag_list?.map((tag) => tag.toLowerCase()) || []),
        product.category?.toLowerCase() || "",
        product.description?.toLowerCase() || "",
      ]

      return searchKeywords.every((keyword) =>
        searchableFields.some((field) => field.includes(keyword))
      )
    })
  }, [products, searchTerm])

  return { searchTerm, setSearchTerm, filteredProducts }
}
