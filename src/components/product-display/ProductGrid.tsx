import React, { useState } from "react"
import ProductCard from "./ProductCard"
import { IProduct } from "../../interfaces/interfaces"
import { useNavigate } from "react-router-dom"
import { IFilterState } from "../../redux/filterSlice"
import Button from "../Button"
import { ArrowForwardIosOutlined } from "@mui/icons-material"

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
    <div className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center justify-center items-center py-5">
        {products.slice(0, maxLimit ?? visibleCount).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}

        {!isExpanded && (
            <div
              className="col-span-1 w-full h-[10vh] md:h-[460px] bg-white border border-zinc-300 duration-500 shadow-md flex flex-col justify-center items-center bg-gradient-to-t from-accent/25 to-white"
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
            >
              <p className="text-xl flex items-center font-serif font-semibold">
                More <ArrowForwardIosOutlined fontSize="small" className="pt-[2px]"/>
              </p>
            </div>
        )}
      </div>
      {visibleCount < products.length && (
        <div className="flex justify-center my-4">
          <Button onClick={loadMoreProducts}>
            <p>Load more products</p>
          </Button>
        </div>
      )}
    </div>
  )
}

export default ProductGrid
