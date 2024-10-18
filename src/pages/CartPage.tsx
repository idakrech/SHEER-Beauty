/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../redux'
import ProductCard from '../components/ProductCard'

const CartPage = () => {
  const productIDs = useSelector((state: AppState) => state.cart.productIDs)
  const products = useSelector((state: AppState) => state.products.products)
  const cartProducts = products.filter((product) => productIDs.includes(product.id))
  return (
    <div>
      {cartProducts.map((product) => <ProductCard {...product}/>)}
      </div>
  )
}

export default CartPage