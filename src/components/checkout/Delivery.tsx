import { useState } from "react"
import { getShipmentRates } from "../../services/shipmentService"
import { IAddress } from "../../interfaces/interfaces"
import { Rate } from "shippo"

const Delivery = ({address} : {address: IAddress}) => {
  const [rates, setRates] = useState<Rate[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRates = async () => {
    setLoading(true)
    setError(null)
    try {
      const rates = await getShipmentRates(address)
      setRates(rates)
    } catch {
      setError("Failed to fetch shipment rates")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
    <h1>Shipping Options</h1>
    <button onClick={fetchRates} disabled={loading}>
      {loading ? "Loading..." : "Get Shipping Rates"}
    </button>
    {error && <p style={{ color: "red" }}>{error}</p>}
    <ul>
      {rates.map((rate) => (
        <li key={rate.servicelevel.token}>
          {rate.servicelevel.name} - {rate.amount} {rate.currency}
        </li>
      ))}
    </ul>
  </div>
)
  
}

export default Delivery
