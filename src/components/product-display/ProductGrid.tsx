import React, { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { IProduct } from "../../interfaces/interfaces"
import { useNavigate } from "react-router-dom";
import checkIfImageExists from "../../helpers/checkImage";

interface IProductGridProps {
  products: IProduct[],
  isExpanded: boolean,
  category?: string,
  maxLimit?: number
}

const ProductGrid: React.FC<IProductGridProps> = ({ products, isExpanded, category, maxLimit }) => {
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
  
      setFilteredProducts(productsWithImages.filter((product) => product !== null) as IProduct[])
    }
  
    filterProductsWithImages()
  }, [products])
  

  return (
    <div className="grid grid-cols-5 gap-4 justify-items-center justify-center py-5">
      {filteredProducts
        .slice(0, maxLimit ?? filteredProducts.length)
        .map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}

      {!isExpanded && (
        <button onClick={() => navigate(`/category-page?gridID=${category}`)}>More</button>
      )}
    </div>
  )
}

export default ProductGrid