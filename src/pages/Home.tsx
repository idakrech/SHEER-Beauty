import React from "react";
import useFetchProducts from "../hooks/useFetchProducts";

const Home = () => {
  const products = useFetchProducts({ brand: "maybelline" }).products;

  return (
    <>
      <div>Home</div>
      {products.map((product) => (
        <div>
          <p>{product.name}</p>
          <p>{product.brand}</p>
          <p>{product.image_link}</p>
          <img src={product.image_link} />
        </div>
      ))}
    </>
  );
};

export default Home;
