import { useEffect, useMemo, useState } from "react"
import { IProduct } from "../interfaces/interfaces"

export function useSearchProducts(products: IProduct[], delay = 300) {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [debouncedTerm, setDebouncedTerm] = useState<string>("")

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTerm(searchTerm), delay)
    return () => clearTimeout(handler)
  }, [searchTerm, delay])

  const filteredProducts = useMemo(() => {
    if (!debouncedTerm) return products

    const normalizedSearchTerm = debouncedTerm.toLowerCase()
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
  }, [products, debouncedTerm])

  return { searchTerm, setSearchTerm, filteredProducts }
}
