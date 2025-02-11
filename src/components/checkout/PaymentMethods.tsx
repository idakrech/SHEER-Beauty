import { useState } from "react"
import CardPayment from "./CardPayment"
import GoogleApplePay from "./GoogleApplePay"

const PaymentMethods = ({totalSum} : {totalSum: number}) => {
    const [selectedMethod, setSelectedMethod] = useState<string>("card")
  
    return (
      <div>
        <h2>Select Payment Method</h2>
        <select onChange={(e) => setSelectedMethod(e.target.value)} value={selectedMethod}>
          <option value="card">Credit / Debit Card</option>
          <option value="google">Google Pay / Apple Pay</option>
        </select>
  
        {selectedMethod === "card" && <CardPayment/>}
        {selectedMethod === "google" && <GoogleApplePay sum={totalSum}/>}
      </div>
    )
  }
  
  export default PaymentMethods