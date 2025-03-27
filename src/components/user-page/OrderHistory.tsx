import { useEffect } from "react"
import { useUserData } from "../../hooks/useUserData"
import { ITransaction } from "../../interfaces/interfaces"
import TransactionItem from "../product-display/TransactionItem"

const OrderHistory = () => {
  const { transactions, transactionsLoading, fetchTransactions } = useUserData()

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-[80wv] bg-white border border-zinc-300 my-5 p-5 md:p-0">
      <h3 className="text-xl text-center font-serif font-bold mt-5 border-b border-zinc-300 pb-1">
        Order History
      </h3>
      {transactionsLoading ? (
        <p>Loading your orders...</p>
      ) : transactions.length > 0 ? (
        
        transactions.map((transaction: ITransaction) => (

          

          <div key={transaction.createdAt.toMillis()} className="lg:w-2/3 w-[80vw] bg-white p-5 border border-zinc-300 my-6 mx-5">
            <h3 className="text-lg text-center font-semibold p-3 border-b border-zinc-300 pb-1 mb-3">No. {transaction.id}</h3>
            <div className="flex items-center px-4 font-normal text-sm w-full border-b border-zinc-300 pb-2">
              <div className="hidden md:block md:w-1/2 text-left">Article</div>
              <div className="md:hidden block w-full text-center">Articles</div>
              <div className="hidden md:block md:w-1/4 text-center">Quantity</div>
              <div className="hidden md:block md:w-1/4 text-right">Sum</div>
            </div>
              {transaction.cart.map(({ product, quantity, selectedColor }) => (
                   <TransactionItem
                   key={product.id}
                   product={product}
                   quantity={quantity}
                   selectedColor={selectedColor}
                 />
              ))}
              <p className="pb-1"><span className="font-semibold">Date: </span>{transaction.createdAt.toDate().toLocaleString()}</p>
              <p className="pb-1"><span className="font-semibold">Payment method: </span>{transaction.payment.method}</p>
              <p className="pb-1"><span className="font-semibold">Total: </span>${transaction.payment.totalSum}</p>
              <p className="pb-1"><span className="font-semibold">Delivery method: </span>{transaction.delivery.provider} {transaction.delivery.service}</p>
          </div>
          
        ))
      ) : (
        <p>No orders yet!</p>
      )}
    </div>
  )
}

export default OrderHistory
