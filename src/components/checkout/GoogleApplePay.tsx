import { useState, useEffect } from "react"
import { useStripe, PaymentRequestButtonElement } from "@stripe/react-stripe-js"

const GoogleApplePay = () => {
  const stripe = useStripe()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //TODO: fix any
  const [paymentRequest, setPaymentRequest] = useState<any>(null)
  const [canMakePayment, setCanMakePayment] = useState(false)

  useEffect(() => {
    if (!stripe) return

    const pr = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: { label: "Demo Payment", amount: 1000 },
      requestPayerName: true,
      requestPayerEmail: true,
    })

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
        setCanMakePayment(true);
      }
    })
  }, [stripe])

  return canMakePayment && paymentRequest ? (
    <PaymentRequestButtonElement options={{ paymentRequest }} />
  ) : (
    <p>Google Pay / Apple Pay not available</p>
  )
}

export default GoogleApplePay