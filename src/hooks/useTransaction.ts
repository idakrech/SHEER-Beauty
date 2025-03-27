import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../redux"
import { ITransaction } from "../interfaces/interfaces"
import { Timestamp } from "firebase/firestore"
import { userDataService } from "../services/userDataService"
import { setProducts } from "../redux/cartSlice"
import { setAddress } from "../redux/transactionDraftSlice"
import { setId } from "../redux/transactionSlice"
import { v4 as uuidv4 } from 'uuid'

export function useTransaction() {
  const cartProducts = useSelector((state: AppState) => state.cart.products)
  const user = useSelector((state: AppState) => state.auth.user)
  const paymentMethod = useSelector((state: AppState) => state.transactionDraft.payment.method)
  const delivery = useSelector((state: AppState) => state.transactionDraft.delivery)
  const totalSum = useSelector((state: AppState) => state.transactionDraft.payment.totalSum)
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
    id: uuidv4(),
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
      userDataService.addTransaction(user?.uid, transaction, transaction.id)
      userDataService.clearCart(user?.uid)
    }
    dispatch(setId(transaction.id))
    dispatch(setProducts([]))
  }

  return {user, totalSum, createTransaction}
}
