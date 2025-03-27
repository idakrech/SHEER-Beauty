import { useState } from "react"
import CardPayment from "./CardPayment"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux"
import { setPaymentMethod } from "../../redux/transactionDraftSlice"
// import DummyGoogleApplePay from "./DummyGoogleApplePay"
import GoogleApplePay from "./GoogleApplePay"

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("card")
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="bg-white p-4 w-full border border-zinc-300">
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
        {selectedMethod === "google" && (
          <div className="my-2 w-full mt-3 flex flex-col gap-2">
            <GoogleApplePay/>
            {/* <DummyGoogleApplePay/> */}
          </div> 
        )}
      </div>
    </div>
  )
}

export default PaymentMethods
