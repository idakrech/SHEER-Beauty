import React from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const products = useFetchProducts({ brand: "maybelline" }).products;

  return (
  <div className="grid grid-cols-4 gap-4 justify-items-center justify-center">
    {products.map(product => (
        <ProductCard brand={product.brand} name={product.name} price={product.price} image_link={product.image_link} id={product.id} price_sign={product.price_sign} currency={product.currency} product_link={product.product_link} website_link={product.website_link} description={product.description} rating={product.rating} category={product.category} product_type={product.product_type} tag_list={product.tag_list} created_at={product.created_at} updated_at={product.updated_at} product_api_url={product.product_api_url} api_featured_image={product.api_featured_image} product_colors={product.product_colors}/>
    ))}
  </div>
  )
}

export default ProductGrid;
