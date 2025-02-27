import { useSelector } from "react-redux"
import { AppState } from "../../redux"
import { useShoppingCart } from "../../hooks/useShoppingCart"

const Summary = () => {
  const totalSum = useSelector(
    (state: AppState) => state.transactionDraft.payment.totalSum
  )
  const delivery = useSelector(
    (state: AppState) => state.transactionDraft.delivery
  )
  const { priceSum } = useShoppingCart()

  return (
    <div className="text-zinc-700">
      <h3 className="text-xl font-serif font-bold border-b border-zinc-300 pb-1 mb-3">
        Summary
      </h3>
      <div className="flex justify-between my-1">
        <p>Subtotal</p>
        <p>${priceSum}</p>
      </div>
      <div className="flex justify-between my-1 border-b border-zinc-300 pb-3">
        <p>{delivery.service || "Shipment"}</p>
        <p>${delivery.rate || "0.00"}</p>
      </div>
      <div className="flex justify-between my-1 text-lg font-bold">
        <p>Total</p>
        <p>${totalSum || "0.00"}</p>
      </div>
    </div>
  )
}

export default Summary
