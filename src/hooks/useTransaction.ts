import { useSelector } from "react-redux"
import { AppState } from "../redux"
import { IAddress, ITransaction } from "../interfaces/interfaces"
import { Timestamp } from "firebase/firestore"
import { userDataService } from "../services/userDataService"
import { setProducts } from "../redux/cartSlice"

export function useTransaction(
  address: IAddress,
  paymentMethod: "card" | "applePay/googlePay"
) {
  const cartProducts = useSelector((state: AppState) => state.cart.products)
  const user = useSelector((state: AppState) => state.auth.user)

  const transaction: ITransaction = {
    cart: cartProducts,
    createdAt: Timestamp.now(),
    shipmentAddress: address,
    paymentMethod: paymentMethod,
  }

  function createTransaction() {
    if (user) {
      userDataService.addTransaction(user?.uid, transaction)
      userDataService.clearCart(user?.uid)
    } 
    setProducts([])
  }

  return {user, createTransaction}
}
