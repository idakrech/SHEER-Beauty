import React from "react"
import ProductCard from "./ProductCard"
import { IProduct } from "../interfaces/interfaces"
import { useNavigate } from "react-router-dom";

interface ProductGridProps {
  products: IProduct[],
  isExpanded: boolean,
  category?: string,
  maxLimit?: number
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isExpanded, category, maxLimit }) => {

  const navigate = useNavigate()


  return (
    <div className="grid grid-cols-4 gap-4 justify-items-center justify-center">
      {maxLimit
        ? products
            .slice(0, maxLimit)
            .map(
              (product) =>
                product.image_link !== null && (
                  <ProductCard
                    {...product}
                  />
                )
            )
        : products.map(
            (product) =>
              product.image_link !== null && (
                <ProductCard
                  {...product}
                />
              )
          )}

          { !isExpanded && (
            <button onClick={() => navigate(`/category-page?gridID=${category}`)}>More</button>
          )}
    </div>
  );
};

export default ProductGrid;
