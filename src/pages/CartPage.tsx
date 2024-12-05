/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../redux"
import ProductCard from "../components/product-display/ProductCard"
import { decrementProductQuantity, deleteProduct } from "../redux/cartSlice"
import { userDataService } from "../services/userDataService"

const CartPage = () => {
  const user = useSelector((state: AppState) => state.auth.user)
  const cartProducts = useSelector((state: AppState) => state.cart.products)
  const products = useSelector((state: AppState) => state.products.products)
  const fullCartProducts = cartProducts
    .map((cartItem) => {
      const productData = products.find((product) => product.id === cartItem.id)
      return productData
        ? { ...productData, quantity: cartItem.quantity }
        : null
    })
    .filter(Boolean) as ((typeof products)[0] & { quantity: number })[]
  // filter(Boolean) filters out null and undefined
  // (typeof products)[0] & { quantity: number } is a 'type intersection'

  const dispatch = useDispatch<AppDispatch>()

  const handleDeleteBtn = (productID: number) => {
    dispatch(deleteProduct(productID))
    if (user !== null) {
      userDataService.removeFromCart(user.uid, productID)
    }
  }

  const handleDecrementBtn = (productID: number) => {
    dispatch(decrementProductQuantity(productID))
    if (user !== null) {
      userDataService.decrementProductQuantity(user.uid, productID)
    }
  }

  return (
    <div>
      {fullCartProducts.map((product) => (
        <div key={product.id}>
          <ProductCard {...product} />
          <p>Quantity: {product.quantity}</p>
          <button onClick={() => handleDeleteBtn(product.id)}>Remove</button>
          <button onClick={() => handleDecrementBtn(product.id)}>Decrement</button>
        </div>
      ))}
    </div>
  )
}

export default CartPage
