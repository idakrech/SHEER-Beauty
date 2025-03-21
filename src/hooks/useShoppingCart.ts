import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../redux"
import { IProduct } from "../interfaces/interfaces"
import {
  addProduct,
  decrementProductQuantity,
  deleteProduct,
} from "../redux/cartSlice"
import { userDataService } from "../services/userDataService"
import { useEffect, useState } from "react"
import Big from "big.js"

export function useShoppingCart() {
  const user = useSelector((state: AppState) => state.auth.user)
  const cart = useSelector((state: AppState) => state.cart)
  const dispatch = useDispatch<AppDispatch>()
  const [priceSum, setPriceSum] = useState<number>(0)
  const cartProducts = cart.products
  const [productsQuantity, setProductsQuantity] = useState<number>(0)

  useEffect(() => {
    setPriceSum(
      (cart.products ?? [])
        .reduce(
          (sum, { product, quantity }) =>
            sum.plus(Big(product.price).times(quantity)),
          Big(0)
        )
        .toNumber()
    )
  }, [cart])

  useEffect(() => {
    setProductsQuantity(
      cart.products.reduce((total, product) => total + product.quantity, 0)
    )
  }, [cart])

  const handleDelete = (product: IProduct, selectedColor?: string) => {
    dispatch(deleteProduct({ product, selectedColor }))
    if (user !== null) {
      userDataService.removeFromCart(user.uid, product, selectedColor)
    }
  }

  const handleDecrement = (product: IProduct, selectedColor?: string) => {
    dispatch(decrementProductQuantity({ product, selectedColor }))
    if (user !== null) {
      userDataService.decrementProductQuantity(user.uid, product, selectedColor)
    }
  }

  const handleAddToCart = (product: IProduct, selectedColor?: string) => {
    dispatch(addProduct({ product, selectedColor }))
    if (user !== null) {
      userDataService.addToCart(user.uid, {
        product,
        quantity: 1,
        selectedColor,
      })
    }
  }

  const getColorName = (
    product: IProduct,
    selectedColor?: string
  ): string | null => {
    if (!selectedColor) return null
    const foundColor = product.product_colors.find(
      (color) => color.hex_value === selectedColor
    )
    return foundColor ? foundColor.colour_name : null
  }

  return {
    cartProducts,
    handleDelete,
    handleDecrement,
    handleAddToCart,
    priceSum,
    productsQuantity,
    getColorName,
  }
}
