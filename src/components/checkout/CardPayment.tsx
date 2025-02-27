import { useState } from "react"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useTransaction } from "../../hooks/useTransaction"

const CardPayment = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null)
  const { createTransaction} = useTransaction()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setPaymentStatus("Processing...")

    setTimeout(() => {
      createTransaction()
      setPaymentStatus("Payment successful")
    }, 2000)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <div className="border border-zinc-300 py-1 px-2 w-1/2">
          <CardElement options={{ hidePostalCode: true }} />
        </div>

        <div className="flex justify-center w-full">
          <button
            type="submit"
            disabled={!stripe}
            className="border border-zinc-300 text-center text-zinc-700 p-3 mt-6 bg-accent hover:bg-dark rounded-md duration-200 ease-in w-1/3 font-bold font-lg"
          >
            Pay Now
          </button>
        </div>
      </form>
      {paymentStatus && (
        <div>
          <p>{paymentStatus}</p>
        </div>
      )}
    </div>
  )
}

export default CardPayment
