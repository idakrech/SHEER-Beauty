import {
  AddressCreateRequest,
  DistanceUnitEnum,
  ParcelCreateRequest,
  Shipment,
  Shippo,
  WeightUnitEnum,
} from "shippo"
import { IAddress } from "../interfaces/interfaces"
import { companyAddress } from "../constants/companyAddress"

const shippo = new Shippo({ apiKeyHeader: import.meta.env.VITE_SHIPPO_API_KEY })

export const getShipment = async (
  address: IAddress
): Promise<Shipment> => {
  try {
    const addressFrom: AddressCreateRequest = {...companyAddress}

    const addressTo: AddressCreateRequest = {
      ...address,
      validate: true
    }

    const parcel: ParcelCreateRequest = {
      length: "5",
      width: "5",
      height: "5",
      distanceUnit: DistanceUnitEnum.In,
      weight: "2",
      massUnit: WeightUnitEnum.Lb,
    }

    const shipment = await shippo.shipments.create({
      addressFrom: addressFrom,
      addressTo: addressTo,
      parcels: [parcel],
      async: false,
    })
    
    return shipment
  } catch (error) {
    console.error("Error fetching shipment rates:", error)
    throw new Error("Failed to fetch shipment rates")
  }
}
