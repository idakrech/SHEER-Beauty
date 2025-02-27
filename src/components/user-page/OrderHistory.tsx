import { useEffect } from "react"
import { useUserData } from "../../hooks/useUserData"
import { ITransaction } from "../../interfaces/interfaces"
import ProductCard from "../product-display/ProductCard"

const OrderHistory = () => {
  const {transactions, transactionsLoading, fetchTransactions} = useUserData()

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <div>
    <h2>Order History</h2>
    {transactionsLoading ? (
      <p>Loading your orders...</p>
    ) : transactions.length > 0 ? (
      transactions.map((transaction: ITransaction) => (
        <div key={transaction.createdAt.toMillis()}>
          <h3>Order Date: {transaction.createdAt.toDate().toLocaleString()}</h3>
          <p>Payment Method: {transaction.payment.method}</p>
          <h4>Products:</h4>
          <div>
            {transaction.cart.map(({ product, quantity }) => (
              <div key={product.id}>
                <ProductCard {...product} />
                <p>Quantity: {quantity}</p>
              </div>
            ))}
          </div>
        </div>
      ))
    ) : (
      <p>No orders yet!</p>
    )}
  </div>
  )
}

export default OrderHistory