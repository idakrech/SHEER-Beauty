import { useEffect, useRef, useState } from "react"
import { getShipment } from "../../services/shipmentService"
import { IAddress } from "../../interfaces/interfaces"
import { AddressValidationResultsMessage, Rate } from "shippo"
import { useUserData } from "../../hooks/useUserData"
import AddressForm from "../user-page/AddressForm"
import { getSummaryMessage } from "../../helpers/formatValidationMessage"

const Delivery = () => {
  const { userDataFromDb, loading } = useUserData()
  const [address, setAddress] = useState<IAddress>()
  const [rates, setRates] = useState<Rate[]>([])
  const [shipmentLoading, setShipmentLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [addressValidationMessages, setAddressValidationMessages] = useState<
    AddressValidationResultsMessage[] | undefined
  >([])
  const isAddressComplete = useRef<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  useEffect(() => {
    if (userDataFromDb?.address) {
      setAddress(userDataFromDb?.address)
      isAddressComplete.current = true
    }
  }, [userDataFromDb?.address])

  const checkIfAddressComplete = (address: IAddress) => {
    const isComplete =
      !!address.name &&
      !!address.street1 &&
      !!address.city &&
      !!address.zip &&
      !!address.state &&
      !!address.country &&
      !!address.phone
    isAddressComplete.current = isComplete
  }

  useEffect(() => {
    if (address) {
      checkIfAddressComplete(address)
    }
  }, [address])

  const fetchRates = async () => {
    setShipmentLoading(true)
    setError(null)
    try {
      if (address) {
        const shipment = await getShipment(address)
        setRates(shipment.rates)
        setAddressValidationMessages(
          shipment.addressTo?.validationResults?.messages
        )
        setAddress(shipment.addressTo)
      }
    } catch (error) {
      console.log("Error fetching shipment rates:", error)
      setError(
        "An error occured. Please make sure to provide all the necessary address information"
      )
      setAddressValidationMessages([])
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
            <AddressForm
              address={address}
              onAddressChange={(updatedAddress, editing) => {
                setAddress(updatedAddress)
                checkIfAddressComplete(updatedAddress)
                setIsEditing(editing)
              }}
              onAddressCompletion={(isComplete) => {
                isAddressComplete.current = isComplete
              }}
            />
          </div>
          {addressValidationMessages &&
            addressValidationMessages.length > 0 && (
              <div>{getSummaryMessage(addressValidationMessages)}</div>
            )}
          <h1>Shipping Options</h1>
          <div className={`${isEditing ? "opacity-50 pointer-events-none" : "opacity-100 pointer-events-auto"}`}>
            {/* TODO: make save btn also fetch rates btn */}
            <button onClick={fetchRates} disabled={isEditing}> 
              {/* !isAddressComplete.current */}
              {shipmentLoading ? "Loading..." : "Get Shipping Rates"}
            </button>
            {shipmentLoading && <p>Fetching shipment rates...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
              {rates.map((rate) => (
                <li key={rate.servicelevel.token}>
                  {rate.servicelevel.name} - {rate.amount} {rate.currency}{" "}
                  {`(${rate.amountLocal} ${rate.currencyLocal})`}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

export default Delivery
