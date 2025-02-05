import { useEffect, useState } from "react"
import { AddressValidationResultsMessage, Rate } from "shippo"
import { getShipment } from "../services/shipmentService"
import { IAddress } from "../interfaces/interfaces"
import { useUserData } from "./useUserData"

export const useShipmentRates = () => {
    //TODO: what to do with loading from userdata hook? Can I import it separately in Delivery?
  const { userDataFromDb } = useUserData()
  const [rates, setRates] = useState<Rate[]>([])
  const [shipmentLoading, setShipmentLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [addressValidationMessages, setAddressValidationMessages] = useState<
    AddressValidationResultsMessage[] | undefined
  >([])
  const [address, setAddress] = useState<IAddress>({
    name: "",
    street1: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    phone: "",
  })

  useEffect(() => {
    if (userDataFromDb?.address) {
      setAddress(userDataFromDb?.address)
    }
  }, [userDataFromDb?.address])

  const fetchRates = async (address: IAddress) => {
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

  return {
    rates,
    shipmentLoading,
    error,
    addressValidationMessages,
    address,
    fetchRates,
    setAddress
  }
}
