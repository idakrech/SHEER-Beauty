import { IAddress } from "../interfaces/interfaces"

export const checkIfAddressComplete = (address: IAddress): boolean => {
  return (
    !!address.name &&
    !!address.street1 &&
    !!address.city &&
    !!address.zip &&
    !!address.country &&
    !!address.phone
  )
}
