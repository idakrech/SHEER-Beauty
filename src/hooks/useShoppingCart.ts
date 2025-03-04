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

export function useShoppingCart() {
  const user = useSelector((state: AppState) => state.auth.user)
  const cart = useSelector((state: AppState) => state.cart)
  const dispatch = useDispatch<AppDispatch>()
  const [priceSum, setPriceSum] = useState<number>(0)
  const cartProducts = cart.products
  const [productsQuantity, setProductsQuantity] = useState<number>(0)

  useEffect(() => {
    setPriceSum(
      (cart.products ?? []).reduce((sum, { product, quantity }) => sum + parseFloat(product.price) * quantity, 0)
    )
  }, [cart])

  useEffect(() => {
    setProductsQuantity(cart.products.reduce((total, product) => total + product.quantity, 0))
  }, [cart])

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

  return { cartProducts, handleDelete, handleDecrement, handleAddToCart, priceSum, productsQuantity }
}
