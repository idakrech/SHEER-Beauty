import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AppState } from "../../redux"
import { useState } from "react"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

//BIG: fake payment api
//TODO: pass total amount of delivery & shopping cart
const CardPayment = () => {
  const navigate = useNavigate()
  const user = useSelector((state: AppState) => state.auth.user)
  const stripe = useStripe()
  const elements = useElements()
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setPaymentStatus("Processing...")

    setTimeout(() => {
      setPaymentStatus("Payment successful! 🎉")
    }, 2000)
  }

  return (
    <div>
      <p>Payment</p>
      <form onSubmit={handleSubmit}>
        <CardElement options={{ hidePostalCode: true }}/>
        <button type="submit" disabled={!stripe}>Pay Now</button>
      </form>
      {paymentStatus && <p>{paymentStatus}</p>}
      {user && (
        <button onClick={() => navigate("/user-page/order-history")}>
          Go to orders
        </button>
      )}
    </div>
  )
}

export default CardPayment
