import React from "react"
import ProductCard from "./ProductCard"
import { IProduct } from "../../interfaces/interfaces"
import { useNavigate } from "react-router-dom"
import { IFilterState } from "../../redux/filterSlice"

interface IProductGridProps {
  products: IProduct[]
  isExpanded: boolean
  maxLimit?: number
  filters?: IFilterState
  title: string
}

const ProductGrid: React.FC<IProductGridProps> = ({
  products,
  isExpanded,
  maxLimit,
  filters,
  title,
}) => {
  const navigate = useNavigate()

  return (
    <div>
      <h3>{title}</h3>
      <div className="grid grid-cols-5 gap-4 justify-items-center justify-center py-5">
        {products
          .slice(0, maxLimit ?? products.length)
          .map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}

        {!isExpanded && (
          <button
            onClick={() => {
              const params = new URLSearchParams()
              if (filters?.type)
                params.append("type", filters.type.toLowerCase())
              if (filters?.category)
                params.append("category", filters.category.toLowerCase())
              filters?.selectedBrands.forEach((brand) =>
                params.append("brand", brand.toLowerCase())
              )
              filters?.selectedTags.forEach((tag) => params.append("tag", tag.toLowerCase()))
              if (filters?.priceRange?.min)
                params.append("price_min", filters.priceRange.min.toString())
              if (filters?.priceRange?.max)
                params.append("price_max", filters.priceRange.max.toString())
              
              if (title) {
                params.append("title", title)
              }
              navigate(`/promoted?${params.toString()}`)
            }}
          >
            More
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductGrid
