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
                product.image_link != null && (
                  <ProductCard
                    brand={product.brand}
                    name={product.name}
                    price={product.price}
                    image_link={product.image_link}
                    id={product.id}
                    price_sign={product.price_sign}
                    currency={product.currency}
                    product_link={product.product_link}
                    website_link={product.website_link}
                    description={product.description}
                    rating={product.rating}
                    category={product.category}
                    product_type={product.product_type}
                    tag_list={product.tag_list}
                    created_at={product.created_at}
                    updated_at={product.updated_at}
                    product_api_url={product.product_api_url}
                    api_featured_image={product.api_featured_image}
                    product_colors={product.product_colors}
                  />
                )
            )
        : products.map(
            (product) =>
              product.image_link != null && (
                <ProductCard
                  brand={product.brand}
                  name={product.name}
                  price={product.price}
                  image_link={product.image_link}
                  id={product.id}
                  price_sign={product.price_sign}
                  currency={product.currency}
                  product_link={product.product_link}
                  website_link={product.website_link}
                  description={product.description}
                  rating={product.rating}
                  category={product.category}
                  product_type={product.product_type}
                  tag_list={product.tag_list}
                  created_at={product.created_at}
                  updated_at={product.updated_at}
                  product_api_url={product.product_api_url}
                  api_featured_image={product.api_featured_image}
                  product_colors={product.product_colors}
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
