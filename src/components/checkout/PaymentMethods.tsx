import { useState } from "react"
import CardPayment from "./CardPayment"
import GoogleApplePay from "./GoogleApplePay"
import { IAddress } from "../../interfaces/interfaces"

const PaymentMethods = ({totalSum, shipmentAddress} : {totalSum: number, shipmentAddress: IAddress}) => {
    const [selectedMethod, setSelectedMethod] = useState<string>("card")
  
    return (
      <div>
        <h2>Select Payment Method</h2>
        <select onChange={(e) => setSelectedMethod(e.target.value)} value={selectedMethod}>
          <option value="card">Credit / Debit Card</option>
          <option value="google">Google Pay / Apple Pay</option>
        </select>
  
        {selectedMethod === "card" && <CardPayment shipmentAddress={shipmentAddress}/>}
        {/* TODO: add disclaimer and warning not to perform real payment through the provider */}
        {selectedMethod === "google" && <GoogleApplePay sum={totalSum}/>}
      </div>
    )
  }
  
  export default PaymentMethods