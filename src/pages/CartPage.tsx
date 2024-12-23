import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../redux"
import ProductCard from "../components/product-display/ProductCard"
import { decrementProductQuantity, deleteProduct } from "../redux/cartSlice"
import { userDataService } from "../services/userDataService"
import { IProduct } from "../interfaces/interfaces"

const CartPage = () => {
  const user = useSelector((state: AppState) => state.auth.user)
  const cartProducts = useSelector((state: AppState) => state.cart.products)

  const dispatch = useDispatch<AppDispatch>()

  const handleDeleteBtn = (product: IProduct) => {
    dispatch(deleteProduct(product))
    if (user !== null) {
      userDataService.removeFromCart(user.uid, product)
    }
  }

  const handleDecrementBtn = (product: IProduct) => {
    dispatch(decrementProductQuantity(product))
    if (user !== null) {
      userDataService.decrementProductQuantity(user.uid, product)
    }
  }

  return (
    <div>
      {cartProducts.map((product) => (
        <div key={product.product.id}>
          <ProductCard {...product.product} />
          <p>Quantity: {product.quantity}</p>
          <button onClick={() => handleDeleteBtn(product.product)}>Remove</button>
          <button onClick={() => handleDecrementBtn(product.product)}>Decrement</button>
        </div>
      ))}
      <button>Checkout</button>
    </div>
  )
}

export default CartPage
