import { useEffect, useState } from "react"
import { AddressValidationResultsMessage, Rate } from "shippo"
import { getShipment } from "../services/shipmentService"
import { useUserData } from "./useUserData"
import { setAddress, setCorrectedAddress } from "../redux/transactionDraftSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../redux"

export const useShipmentRates = () => {
  const { userDataFromDb } = useUserData()
  const [rates, setRates] = useState<Rate[]>([])
  const [shipmentLoading, setShipmentLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [addressValidationMessages, setAddressValidationMessages] = useState<
    AddressValidationResultsMessage[] | undefined
  >([])
  const address = useSelector(
    (state: AppState) => state.transactionDraft.delivery.address
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (userDataFromDb?.address) {
      dispatch(setAddress(userDataFromDb?.address))
    }
  }, [userDataFromDb?.address])

  const fetchRates = async () => {
    setShipmentLoading(true)
    setError(null)
    setAddressValidationMessages(undefined)
    try {
      if (address) {
        const shipment = await getShipment(address)
        dispatch(setCorrectedAddress({ ...shipment.addressTo }))
        setRates(shipment.rates)
        setAddressValidationMessages(
          shipment.addressTo?.validationResults?.messages || []
        )
      }
    } catch {
      setError(
        "Sorry, we cannot check the available delivery options at the moment. Please try again later 💕"
      )
      setAddressValidationMessages(undefined)
    } finally {
      setShipmentLoading(false)
    }
  }

  return {
    rates,
    shipmentLoading,
    error,
    addressValidationMessages,
    fetchRates,
    setRates,
    address,
  }
}
