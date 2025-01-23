import { useUserData } from "../../hooks/useUserData"
import AddressForm from "../user-page/AddressForm"

const Checkout = () => {
  const { userDataFromDb, loading } = useUserData()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h3>Checkout</h3>
      {userDataFromDb?.address ? <AddressForm address={userDataFromDb?.address}/> : <AddressForm/>}
      {/* TODO: delivery form */}
      {/* TODO: payment form */}
    </div>
  )
}

export default Checkout
