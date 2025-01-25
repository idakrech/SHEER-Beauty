import { useEffect, useState } from "react"
import { useUserData } from "../../hooks/useUserData"
import AddressForm from "../user-page/AddressForm"
import Delivery from "./Delivery"
import Payment from "./Payment"
import { IAddress } from "../../interfaces/interfaces"

const Checkout = () => {
  const { userDataFromDb, loading } = useUserData()
  const [address, setAddress] = useState<IAddress>()

  useEffect(() => {
    if (userDataFromDb?.address) {
      setAddress(userDataFromDb?.address)
    }
  }, [userDataFromDb])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h3>Checkout</h3>
      {userDataFromDb?.address ? (
        <AddressForm
          address={userDataFromDb?.address}
          onAddressChange={setAddress}
        />
      ) : (
        <AddressForm onAddressChange={setAddress} />
      )}
      {address && <Delivery address={address} />}
      <Payment />
      {/* TODO: delivery form */}
      {/* TODO: payment form */}
    </div>
  )
}

export default Checkout
