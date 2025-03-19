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
  const { loading, error } = useUserData()
  return (
    <div className="w-full flex justify-center">
      {user ? (
        error ? (
          <div className="bg-white p-4 w-full border border-zinc-300 my-4">
            <h3 className="font-serif font-semibold text-center">
              Sorry, we cannot access your personal information at the moment
              due to an error. Please try again later 💕
            </h3>
          </div>
        ) : (
          <>
            {tab === "account-details" && (
              <div className="bg-white p-4 w-2/3 border border-zinc-300 my-4">
                <h3 className="text-xl text-center font-serif font-bold mx-3 mt-2 border-b border-zinc-300 pb-1">
                  Account details
                </h3>
                {loading ? (
                  <p>Loading your account information...</p>
                ) : (
                  <div className="mx-3 my-4">
                    <AddressForm />
                  </div>
                )}
              </div>
            )}
            {tab === "order-history" && <OrderHistory />}
            {tab === "favorites" && (
              <div className="bg-white p-4 w-full border border-zinc-300 my-4 flex flex-col justify-center items-center">
                <h3 className="text-xl font-serif font-bold my-5 border-b border-zinc-300 pb-1">
                  Favorite products
                </h3>
                <ProductGrid
                  products={favorites}
                  isExpanded={true}
                  title="Favorites"
                />
              </div>
            )}
          </>
        )
      ) : (
        <div className="bg-white p-4 w-2/3 border border-zinc-300 my-4">
          <h3 className="text-xl text-center font-serif font-bold mx-3 mt-2 border-b border-zinc-300 pb-1">
            Account details
          </h3>
          <p className="mt-5 mb-3 mx-3 text-center">
            Log in or create an account for a personalized shopping experience!
            ✨
          </p>
        </div>
      )}
    </div>
  )
}

export default UserPage
