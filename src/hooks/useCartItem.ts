import { useSelector } from "react-redux"
import { AppState } from "../redux"
import { IProduct } from "../interfaces/interfaces"

export const useCartItem = (product?: IProduct) => {
  const cartProducts = useSelector((state: AppState) => state.cart.products)
  const cartItem = product
    ? cartProducts.find((item) => item.product.id === product.id)
    : undefined
  const quantity = cartItem ? cartItem.quantity : 0

  return { cartItem, quantity }
}
