import { useSelector } from "react-redux"
import { AppState } from "../redux"
import { IProduct } from "../interfaces/interfaces"
import { useEffect, useState } from "react"

export const useCartItem = (product?: IProduct, selectedColor?: string) => {
  const cartProducts = useSelector((state: AppState) => state.cart.products)

  const findCartItem = () =>
    product
      ? cartProducts.find((item) =>
          selectedColor
            ? item.product.id === product.id &&
              item.selectedColor === selectedColor
            : item.product.id === product.id
        )
      : undefined

  const [cartItem, setCartItem] = useState(findCartItem())
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0)

  useEffect(() => {
    const newCartItem = findCartItem()
    setCartItem(newCartItem)
    setQuantity(newCartItem ? newCartItem.quantity : 0)
  }, [cartProducts, selectedColor])

  return { cartItem, quantity }
}
