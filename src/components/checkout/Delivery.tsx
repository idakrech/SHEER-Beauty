import { useEffect, useState } from "react"
import AddressForm from "../user-page/AddressForm"
import { getSummaryMessage } from "../../helpers/formatValidationMessage"
import { useShipmentRates } from "../../hooks/useShipmentRates"
import { useUserData } from "../../hooks/useUserData"
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { setDeliveryMethod, setTotalSum } from "../../redux/transactionDraftSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../../redux"
import { checkIfAddressComplete } from "../../helpers/checkAddressCompletion"
import { useShoppingCart } from "../../hooks/useShoppingCart"

const Delivery = () => {
  const { loading, error: dbAddressError } = useUserData()
  const {
    rates,
    shipmentLoading,
    error,
    addressValidationMessages,
    fetchRates
  } = useShipmentRates()
  const [selectedRate, setSelectedRate] = useState<number | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const address = useSelector(
    (state: AppState) => state.transactionDraft.delivery.address
  )
  const { priceSum } = useShoppingCart()

  useEffect(() => {
    if (address && checkIfAddressComplete(address)) {
      fetchRates()
    }
  }, [address])

  useEffect(() => {
    if (rates.length > 0) {
      setSelectedRate(parseFloat(rates[0].amount))
      dispatch(setDeliveryMethod({service: rates[0].servicelevel.name || "", provider: rates[0].provider, rate: parseFloat(rates[0].amount)}))
      dispatch(setTotalSum(parseFloat(priceSum.toFixed(2)) + parseFloat(parseFloat(rates[0].amount).toFixed(2))))
    }
  }, [rates])

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
            <AddressForm/>
            {dbAddressError && <p>{dbAddressError}</p>}
          </div>
          {addressValidationMessages &&
            addressValidationMessages.length > 0 && (
              <div className="flex font-sans font-italic font-normal text-zinc-700 bg-accent border border-zinc-300 px-3 py-2 m-3"><ErrorOutlineOutlinedIcon/><p className="ml-2">{getSummaryMessage(addressValidationMessages)}</p></div>
            )}

          <h3 className="text-xl text-zinc-700 font-serif font-bold mx-3 mt-5 border-b border-zinc-300 pb-1">
            Delivery methods
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
                  <div className="flex justify-between">
                  <label>
                    <input
                      type="radio"
                      name="shippingRate"
                      value={rate.amount}
                      checked={selectedRate === parseFloat(rate.amount)}
                      onChange={() => {
                        setSelectedRate(parseFloat(rate.amount))
                        dispatch(setDeliveryMethod({service: rate.servicelevel.name || "", provider: rate.provider, rate: parseFloat(rate.amount)}))
                        dispatch(setTotalSum(parseFloat(priceSum.toFixed(2)) + parseFloat(parseFloat(rate.amount).toFixed(2))))
                      }}
                      className="accent-accent mr-2"
                    />
                    {rate.provider} {rate.servicelevel.name} {rate.durationTerms && `- ${rate.durationTerms?.toLocaleLowerCase().slice(0, -1)}`}
                  </label>
                  <p>{rate.currency === "USD" ? `$${rate.amount}` : `${rate.amount} ${rate.currency}`}</p>
                  </div>
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
