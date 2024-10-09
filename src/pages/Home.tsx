import React from "react";
import ProductGrid from "../components/ProductGrid";
import useFetchProducts from "../hooks/useFetchProducts";
import { useSelector } from "react-redux";
import { AppState } from "../redux";

const Home = () => {
  
  useFetchProducts({ product_tags: "Organic"})
  useFetchProducts({ rating_greater_than: 4})
  useFetchProducts({product_category: "lip_gloss"})

  const organicProducts = useSelector((state: AppState) => state.products.products.filter(product => product.tag_list.filter(tag => tag == 'Organic')))
  const highestRatedProducts = useSelector((state: AppState) => state.products.products.filter(product => ((product.rating && product.rating >= 4))))
  const lipglossProducts = useSelector((state: AppState) => state.products.products.filter(product => ((product.category && product.category == 'lip_gloss'))))

  return (
    <>
      <h1>Organic Products</h1>
      <ProductGrid products={organicProducts}/>
      <h1>Highest rated</h1>
      <ProductGrid products={highestRatedProducts}/>
      <h1>Time to shine!</h1>
      <ProductGrid products={lipglossProducts}/>
    </>
  )
}

export default Home;
