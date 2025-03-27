import { useState, useEffect } from "react"
import { useStripe, PaymentRequestButtonElement } from "@stripe/react-stripe-js"
import type { PaymentRequest } from "@stripe/stripe-js"
import { useTransaction } from "../../hooks/useTransaction"

const GoogleApplePay = () => {
  const stripe = useStripe()

  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null)
  const [canMakePayment, setCanMakePayment] = useState(false)
  const { totalSum } = useTransaction()

  useEffect(() => {
    if (!stripe || totalSum === null) return

    const pr = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: { label: "Demo Payment", amount: Math.round(totalSum * 100)},
      requestPayerName: true,
      requestPayerEmail: true,
    })

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr)
        setCanMakePayment(true)
      }
    })
  }, [stripe])

  return canMakePayment && paymentRequest ? (
    <PaymentRequestButtonElement options={{ paymentRequest }} className="w-full md:w-1/3"/>
  ) : (
    <p>Google Pay/Apple Pay not available</p>
  )
}

export default GoogleApplePay