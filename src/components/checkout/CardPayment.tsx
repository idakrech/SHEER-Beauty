import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { IAddress } from "../../interfaces/interfaces"
import { useTransaction } from "../../hooks/useTransaction"

const CardPayment = ({ shipmentAddress }: { shipmentAddress: IAddress }) => {
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null)
  const [isPaymentComplete, setIsPaymentComplete] = useState<boolean>(false)
  const { createTransaction, user } = useTransaction(shipmentAddress, "card")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setPaymentStatus("Processing...")

    setTimeout(() => {
      setPaymentStatus("Payment successful! 🎉")
      setIsPaymentComplete(true)
      createTransaction()
    }, 2000)
  }

  return (
    <div>
      <p>Payment</p>
      <form onSubmit={handleSubmit}>
        <CardElement options={{ hidePostalCode: true }} />
        <button type="submit" disabled={!stripe}>
          Pay Now
        </button>
      </form>
      {paymentStatus && <p>{paymentStatus}</p>}
      {user && isPaymentComplete && (
        <button
          onClick={() => {
            navigate("/user-page/order-history")
          }}
        >
          Go to orders
        </button>
      )}
    </div>
  )
}

export default CardPayment
