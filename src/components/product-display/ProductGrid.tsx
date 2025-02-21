import React, { useState } from "react"
import ProductCard from "./ProductCard"
import { IProduct } from "../../interfaces/interfaces"
import { useNavigate } from "react-router-dom"
import { IFilterState } from "../../redux/filterSlice"
import Button from "../Button"

interface IProductGridProps {
  products: IProduct[]
  isExpanded: boolean
  maxLimit?: number
  filters?: IFilterState
  title: string
}

const PAGE_SIZE = 20

const ProductGrid: React.FC<IProductGridProps> = ({
  products,
  isExpanded,
  maxLimit,
  filters,
  title,
}) => {
  const navigate = useNavigate()
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const loadMoreProducts = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE)
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 justify-items-center justify-center items-center py-5">
        {products.slice(0, maxLimit ?? visibleCount).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}

        {!isExpanded && (
          <Button
            onClick={() => {
              const params = new URLSearchParams()
              if (filters?.type)
                params.append("type", filters.type.toLowerCase())
              if (filters?.category)
                params.append("category", filters.category.toLowerCase())
              filters?.selectedBrands.forEach((brand) =>
                params.append("brand", brand.toLowerCase())
              )
              filters?.selectedTags.forEach((tag) =>
                params.append("tag", tag.toLowerCase())
              )
              if (filters?.priceRange?.min)
                params.append("price_min", filters.priceRange.min.toString())
              if (filters?.priceRange?.max)
                params.append("price_max", filters.priceRange.max.toString())

              if (title) {
                params.append("title", title)
              }
              navigate(`/promoted?${params.toString()}`)
            }}
            children={<p>More</p>}
          />
        )}
      </div>
      {visibleCount < products.length && (
        <div className="flex justify-center mt-4">
          <Button onClick={loadMoreProducts}>
            <p>Load more products</p>
          </Button>
        </div>
      )}
    </div>
  )
}

export default ProductGrid
