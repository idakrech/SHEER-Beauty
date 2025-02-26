import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../redux"
import { ITransaction } from "../interfaces/interfaces"
import { Timestamp } from "firebase/firestore"
import { userDataService } from "../services/userDataService"
import { setProducts } from "../redux/cartSlice"
import { useShoppingCart } from "./useShoppingCart"
import { setAddress } from "../redux/transactionDraftSlice"

export function useTransaction() {
  const cartProducts = useSelector((state: AppState) => state.cart.products)
  const user = useSelector((state: AppState) => state.auth.user)
  const paymentMethod = useSelector((state: AppState) => state.transactionDraft.payment.method)
  const { priceSum } = useShoppingCart()
  const delivery = useSelector((state: AppState) => state.transactionDraft.delivery)
  const totalSum = delivery.rate ? parseFloat(delivery.rate.toFixed(2)) + parseFloat(priceSum.toFixed(2)) : parseFloat(priceSum.toFixed(2))
  const dispatch = useDispatch<AppDispatch>()

  const finalAddress = delivery.correctedAddress ?? delivery.address ?? {
    name: "",
    street1: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    phone: "",
  }

  const transaction: ITransaction = {
    cart: cartProducts,
    createdAt: Timestamp.now(),
    delivery: {
      address: finalAddress,
      service: delivery.service || "",
      provider: delivery.provider || "",
      rate: delivery.rate
    },
    payment: {
      method: paymentMethod,
      totalSum: totalSum
    }
  }

  function createTransaction() {
    if (user) {
      dispatch(setAddress(finalAddress))
      userDataService.addTransaction(user?.uid, transaction)
      userDataService.clearCart(user?.uid)
    } 
    setProducts([])
  }

  return {user, totalSum, createTransaction}
}
