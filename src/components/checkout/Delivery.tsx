import { useEffect, useRef, useState } from "react"
import { IAddress } from "../../interfaces/interfaces"
import AddressForm from "../user-page/AddressForm"
import { getSummaryMessage } from "../../helpers/formatValidationMessage"
import { useShipmentRates } from "../../hooks/useShipmentRates"
import { useUserData } from "../../hooks/useUserData"

const Delivery = () => {
  const {loading} = useUserData()
  const {rates, shipmentLoading, error, addressValidationMessages, address, fetchRates, setAddress} = useShipmentRates()
  const isAddressComplete = useRef<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)

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
            <button onClick={() => fetchRates(address)} disabled={isEditing}> 
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
