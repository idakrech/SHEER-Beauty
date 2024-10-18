/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "../redux"
import ProductCard from "../components/ProductCard"
import { deleteProductID } from "../redux/cartSlice"

const CartPage = () => {
  const productIDs = useSelector((state: AppState) => state.cart.productIDs)
  const products = useSelector((state: AppState) => state.products.products)
  const cartProducts = products.filter((product) =>
    productIDs.includes(product.id)
  )
  const dispatch = useDispatch()

  const handleDeleteBtn = (productID: number) => {
    dispatch(deleteProductID(productID))
  }

  return (
    <div>
      {cartProducts.map((product) => (
        <div>
          <ProductCard {...product} />
          <button onClick={() => handleDeleteBtn(product.id)}>REMOVE</button>
        </div>
      ))}
    </div>
  )
}

export default CartPage
