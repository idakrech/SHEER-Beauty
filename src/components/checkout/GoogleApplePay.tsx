import { useState, useEffect } from "react"
import { useStripe, PaymentRequestButtonElement } from "@stripe/react-stripe-js"
import { useTransaction } from "../../hooks/useTransaction"

const GoogleApplePay = () => {
  const stripe = useStripe()
  //TODO: fix any in useState
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [paymentRequest, setPaymentRequest] = useState<any>(null)
  const [canMakePayment, setCanMakePayment] = useState(false)
  const { totalSum } = useTransaction()

  useEffect(() => {
    if (!stripe) return

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
    <PaymentRequestButtonElement options={{ paymentRequest }} />
  ) : (
    <p>Google Pay/Apple Pay not available</p>
  )
}

export default GoogleApplePay