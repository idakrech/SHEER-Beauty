import { IAddress } from "../interfaces/interfaces"

export const areAddressesEqual = (
  addr1: IAddress | undefined | null,
  addr2: IAddress
) => {
  if (!addr1) return false
  return (
    addr1.street1 === addr2.street1 &&
    addr1.city === addr2.city &&
    addr1.zip === addr2.zip &&
    addr1.state === addr2.state &&
    addr1.country === addr2.country &&
    addr1.name === addr2.name &&
    addr1.phone === addr2.phone
  )
}
