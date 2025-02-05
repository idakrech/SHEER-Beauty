import { useEffect, useRef, useState } from "react"
import AddressForm from "../user-page/AddressForm"
import { getSummaryMessage } from "../../helpers/formatValidationMessage"
import { useShipmentRates } from "../../hooks/useShipmentRates"
import { useUserData } from "../../hooks/useUserData"
import { checkIfAddressComplete } from "../../helpers/checkAddressCompletion"

const Delivery = () => {
  const { loading } = useUserData()
  const {
    rates,
    shipmentLoading,
    error,
    addressValidationMessages,
    address,
    fetchRates,
    setAddress,
    setRates,
  } = useShipmentRates()
  const isAddressComplete = useRef<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  useEffect(() => {
    if (address) {
      isAddressComplete.current = checkIfAddressComplete(address)
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
                isAddressComplete.current = checkIfAddressComplete(updatedAddress)
                if (editing) {
                  setRates([])
                }
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
          <div
            className={`${
              isEditing
                ? "opacity-50 pointer-events-none"
                : "opacity-100 pointer-events-auto"
            }`}
          >
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
