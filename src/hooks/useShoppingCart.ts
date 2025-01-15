import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../redux"
import { IProduct } from "../interfaces/interfaces"
import {
  addProduct,
  decrementProductQuantity,
  deleteProduct,
} from "../redux/cartSlice"
import { userDataService } from "../services/userDataService"

export function useShoppingCart() {
  const user = useSelector((state: AppState) => state.auth.user)
  const cartProducts = useSelector((state: AppState) => state.cart.products)
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = (product: IProduct) => {
    dispatch(deleteProduct(product))
    if (user !== null) {
      userDataService.removeFromCart(user.uid, product)
    }
  }

  const handleDecrement = (product: IProduct) => {
    dispatch(decrementProductQuantity(product))
    if (user !== null) {
      userDataService.decrementProductQuantity(user.uid, product)
    }
  }

  const handleAddToCart = (product: IProduct) => {
    dispatch(addProduct(product))
    if (user !== null) {
      userDataService.addToCart(user.uid, { product: product, quantity: 1 })
    }
  }

  return { cartProducts, handleDelete, handleDecrement, handleAddToCart }
}
