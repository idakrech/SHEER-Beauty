/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "../redux"
import ProductCard from "../components/ProductCard"
import { deleteProduct } from "../redux/cartSlice"

const CartPage = () => {
  const cartProductIDs = useSelector((state: AppState) => state.cart.products).map((product) => product.id)
  const products = useSelector((state: AppState) => state.products.products)
  const cartProducts = products.filter((product) =>
    cartProductIDs.includes(product.id)
  )
  const dispatch = useDispatch()

  const handleDeleteBtn = (productID: number) => {
    dispatch(deleteProduct(productID))
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
