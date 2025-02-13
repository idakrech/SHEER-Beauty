import { useEffect, useState } from "react"
import AddressForm from "../user-page/AddressForm"
import { getSummaryMessage } from "../../helpers/formatValidationMessage"
import { useShipmentRates } from "../../hooks/useShipmentRates"
import { useUserData } from "../../hooks/useUserData"
import { checkIfAddressComplete } from "../../helpers/checkAddressCompletion"
import { IAddress } from "../../interfaces/interfaces"

const Delivery = ({ setSelectedRate }: { setSelectedRate: (rate: number) => void }) => {
  const { loading, error: dbAddressError, userDataFromDb } = useUserData()
  const {
    rates,
    shipmentLoading,
    error,
    addressValidationMessages,
    address,
    fetchRates,
    setAddress
  } = useShipmentRates()
  const [selectedRate, setLocalSelectedRate] = useState<number | null>(null)

  useEffect(() => {
    if (userDataFromDb?.address) {
      setAddress(userDataFromDb.address)
      if (checkIfAddressComplete(userDataFromDb.address)) {
        fetchRates(userDataFromDb.address)
      }
    }
  }, [userDataFromDb?.address])

  useEffect(() => {
    if (rates.length > 0) {
      setLocalSelectedRate(parseFloat(rates[0].amount))
      setSelectedRate(parseFloat(rates[0].amount))
    }
  }, [rates])

  const handleAddressSave = async (savedAddress: IAddress) => {
    setAddress(savedAddress) 
    if (checkIfAddressComplete(savedAddress)) {
      await fetchRates(savedAddress)
    }
  }

  return (
    <div>
      {loading ? (
        <div>Loading your address...</div>
      ) : (
        <>
          <div>
            <h3>Checkout</h3>
            <AddressForm
              address={address}
              onSave={handleAddressSave}
            />
            {dbAddressError && <p>{dbAddressError}</p>}
          </div>
          {addressValidationMessages &&
            addressValidationMessages.length > 0 && (
              <div>{getSummaryMessage(addressValidationMessages)}</div>
            )}
          <h1>Shipping Options</h1>
            {shipmentLoading && <p>Fetching shipment rates...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
              {rates.map((rate) => (
                <li key={rate.servicelevel.token}>
                  <label>
                    <input 
                      type="radio"
                      name="shippingRate"
                      value={rate.amount}
                      checked={selectedRate === parseFloat(rate.amount)}
                      onChange={() => {
                        setLocalSelectedRate(parseFloat(rate.amount))
                      }}
                    />
                  {rate.servicelevel.name} - {rate.amount} {rate.currency}{" "}
                  {`(${rate.amountLocal} ${rate.currencyLocal})`}
                  </label>
                </li>
              ))}
            </ul>
        </>
      )}
    </div>
  )
}

export default Delivery
