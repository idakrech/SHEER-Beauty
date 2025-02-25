import { useEffect, useState } from "react"
import AddressForm from "../user-page/AddressForm"
import { getSummaryMessage } from "../../helpers/formatValidationMessage"
import { useShipmentRates } from "../../hooks/useShipmentRates"
import { useUserData } from "../../hooks/useUserData"
import { checkIfAddressComplete } from "../../helpers/checkAddressCompletion"
import { IAddress } from "../../interfaces/interfaces"
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const Delivery = ({
  setSelectedRate,
  setShipmentAddress,
}: {
  setSelectedRate: (rate: number) => void
  setShipmentAddress: (address: IAddress) => void
}) => {
  const { loading, error: dbAddressError, userDataFromDb } = useUserData()
  const {
    rates,
    shipmentLoading,
    error,
    addressValidationMessages,
    address,
    fetchRates,
    setAddress,
  } = useShipmentRates()
  const [selectedRate, setLocalSelectedRate] = useState<number | null>(null)

  useEffect(() => {
    if (userDataFromDb?.address) {
      setAddress(userDataFromDb.address)
      setShipmentAddress(userDataFromDb.address)
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
    setShipmentAddress(savedAddress)
    if (checkIfAddressComplete(savedAddress)) {
      await fetchRates(savedAddress)
    }
  }

  return (
    <div className="bg-white p-4 w-full border border-zinc-300 my-4 text-zinc-700">
      {loading ? (
        <div className="font-sans font-italic font-normal text-zinc-700 text-center">
          Loading your address...
        </div>
      ) : (
        <div>
          <h3 className="text-xl text-zinc-700 font-serif font-bold mx-3 mt-2 border-b border-zinc-300 pb-1">
            Address
          </h3>
          <div className="flex text-zinc-700 p-3">
            <AddressForm address={address} onSave={handleAddressSave} />
            {dbAddressError && <p>{dbAddressError}</p>}
          </div>
          {addressValidationMessages &&
            addressValidationMessages.length > 0 && (
              <div className="flex font-sans font-italic font-normal text-zinc-700 bg-accent border border-zinc-300 px-3 py-2 m-3"><ErrorOutlineOutlinedIcon/><p className="ml-2">{getSummaryMessage(addressValidationMessages)}</p></div>
            )}

          <h3 className="text-xl text-zinc-700 font-serif font-bold mx-3 mt-5 border-b border-zinc-300 pb-1">
            Delivery options
          </h3>
          {shipmentLoading && (
            <p className="font-sans font-italic font-normal text-zinc-700 p-3">
              Fetching shipment rates...
            </p>
          )}
          {error && <div className="flex font-sans font-italic font-normal text-zinc-700 bg-accent border border-zinc-300 px-3 py-2 m-3"><ErrorOutlineOutlinedIcon/><p className="ml-2">{error}</p></div>}
          <div className="p-3">
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
                      className="accent-accent mr-2"
                    />
                    {rate.servicelevel.name} - {rate.amount} {rate.currency}{" "}
                    {`(${rate.amountLocal} ${rate.currencyLocal})`}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Delivery
