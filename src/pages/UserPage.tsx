import { useParams } from "react-router-dom"
import OrderHistory from "../components/user-page/OrderHistory"
import { useSelector } from "react-redux"
import { AppState } from "../redux"
import AddressForm from "../components/user-page/AddressForm"
import ProductGrid from "../components/product-display/ProductGrid"
import { useUserData } from "../hooks/useUserData"

const UserPage = () => {
  const { tab } = useParams<{ tab: string }>()
  const favorites = useSelector((state: AppState) => state.favorites.products)
  const user = useSelector((state: AppState) => state.auth.user)
  const {userDataFromDb, loading} = useUserData()
  return (
    <div>
      {user ? (
        <>
          {tab === "account-details" && (loading ? <p>Loading...</p> : (userDataFromDb?.address ? <AddressForm address={userDataFromDb?.address}/> : <AddressForm/>))}
          {tab === "order-history" && <OrderHistory />}
          {tab === "favorites" && (
            <ProductGrid products={favorites} isExpanded={false} title="Favorites"/>
          )}
        </>
      ) : (
        <p>
          Log in or create an account for a personalized shopping experience
        </p>
      )}
    </div>
  )
}

export default UserPage
