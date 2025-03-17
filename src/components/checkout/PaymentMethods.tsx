import { useState } from "react"
import CardPayment from "./CardPayment"
// import GoogleApplePay from "./GoogleApplePay"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux"
import { setPaymentMethod } from "../../redux/transactionDraftSlice"

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("card")
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="bg-white p-4 w-full border border-zinc-300 mb-4">
      <h3 className="text-xl font-serif font-bold mx-3 mt-2 border-b border-zinc-300 pb-1">
        Payment
      </h3>

      <div className="p-3">
        <h2 className="font-bold">Select Payment Method</h2>
        <div className="my-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={selectedMethod === "card"}
              onChange={(e) => {
                setSelectedMethod(e.target.value)
                dispatch(setPaymentMethod("card"))
              }}
              className="accent-accent"
            />
            <span className="ml-2">Credit/Debit Card</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="google"
              checked={selectedMethod === "google"}
              onChange={(e) => {
                setSelectedMethod(e.target.value)
                dispatch(setPaymentMethod("applePay/googlePay"))
              }}
              className="accent-accent"
            />
            <span className="ml-2">Google Pay/Apple Pay</span>
          </label>
        </div>

        {selectedMethod === "card" && (
          <div className="w-full mt-3">
            <CardPayment/>
          </div>
        )}
        {/* TODO: add disclaimer and warning not to perform real payment through the provider */}
        {selectedMethod === "google" && (
          <div className="my-2 w-1/2 mt-3">
            {/* <GoogleApplePay/> */}
            <p>Google pay hihi</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentMethods
