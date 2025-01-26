import { useEffect, useState } from "react"
import { getShipment } from "../../services/shipmentService"
import { IAddress } from "../../interfaces/interfaces"
import { AddressValidationResultsMessage, Rate } from "shippo"
import { useUserData } from "../../hooks/useUserData"
import AddressForm from "../user-page/AddressForm"

const Delivery = () => {
  const { userDataFromDb, loading } = useUserData()
  const [address, setAddress] = useState<IAddress>()
  const [rates, setRates] = useState<Rate[]>([])
  const [shipmentLoading, setShipmentLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [addressValidationMessages, setAddressValidationMessages] = useState<
    AddressValidationResultsMessage[] | undefined
  >([])

  useEffect(() => {
    if (userDataFromDb?.address) {
      setAddress(userDataFromDb?.address)
    }
  }, [])

  const fetchRates = async () => {
    setShipmentLoading(true)
    setError(null)
    try {
      if (address) {
        const shipment = await getShipment(address)
        setRates(shipment.rates)
        if (!shipment.addressTo.validationResults?.isValid) {
          setAddressValidationMessages(
            shipment.addressTo.validationResults?.messages
          )
        }
      }
    } catch {
      setError("Failed to fetch shipment rates")
    } finally {
      setShipmentLoading(false)
    }
  }

  return (
    <div>
      {loading ? (
        <div>Loading user data...</div>
      ) : (
        <>
          <div>
            <h3>Checkout</h3>
            {userDataFromDb?.address ? (
              <AddressForm
                address={userDataFromDb?.address}
                onAddressChange={setAddress}
              />
            ) : (
              <AddressForm onAddressChange={setAddress} />
            )}
          </div>
          {addressValidationMessages &&
            addressValidationMessages.length > 0 && (
              <div>
                <h4>Address Suggestions:</h4>
                <ul>
                  {addressValidationMessages.map((message, index) => (
                    <li key={index}>{message.text}</li>
                  ))}
                </ul>
              </div>
            )}
          <h1>Shipping Options</h1>
          <button onClick={fetchRates} disabled={shipmentLoading}>
            {shipmentLoading ? "Loading..." : "Get Shipping Rates"}
          </button>
          {shipmentLoading && <p>Fetching shipment rates...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <ul>
            {rates.map((rate) => (
              <li key={rate.servicelevel.token}>
                {rate.servicelevel.name} - {rate.amount} {rate.currency}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Delivery
