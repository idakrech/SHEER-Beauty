import React, { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { IProduct } from "../../interfaces/interfaces"
import { useNavigate } from "react-router-dom"
import checkIfImageExists from "../../helpers/checkImage"
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
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const filterProductsWithImages = async () => {
      const productsWithImages = await Promise.all(
        products.map(
          (product) =>
            new Promise<IProduct | null>((resolve) => {
              checkIfImageExists(product.image_link, (exists) => {
                resolve(exists ? product : null)
              })
            })
        )
      )
      //TODO: filter out products with no brand
      setFilteredProducts(
        productsWithImages.filter((product) => product !== null) as IProduct[]
      )
    }
    filterProductsWithImages()
  }, [products])

  return (
    <div>
      <h3>{title}</h3>
      <div className="grid grid-cols-5 gap-4 justify-items-center justify-center py-5">
        {filteredProducts
          .slice(0, maxLimit ?? filteredProducts.length)
          .map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}

        {!isExpanded && (
          <button
            onClick={() => {
              const params = new URLSearchParams()

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
