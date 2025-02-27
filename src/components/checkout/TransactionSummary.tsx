import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../../redux"
import { useNavigate } from "react-router-dom"
import { resetTransaction } from "../../redux/transactionSlice"
import { useEffect } from "react"

const TransactionSummary = () => {
  const id = useSelector((state: AppState) => state.transaction.id)
  const estimatedTime = useSelector(
    (state: AppState) => state.transaction.estimatedTime
  )
  const user = useSelector((state: AppState) => state.auth.user)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
      return () => {
        dispatch(resetTransaction())
      }
    })

  return (
    <div className="flex text-center justify-center items-center w-full h-3/4">
      <div className="flex flex-col justify-center items-center bg-white p-5 w-2/3 h-1/2 border border-zinc-300 my-4 text-zinc-700">
        <h3 className="text-xl text-zinc-700 font-serif font-bold mt-2 mb-4">
          Thank you for shopping with us!
        </h3>
        <p className="mb-3">Your order {id} has been successfuly placed.</p>
        {estimatedTime && <p className="mb-3">Estimated {estimatedTime}</p>}
        {user ? (
          <div className="flex w-1/2 justify-between mt-4">
            <button
              onClick={() => {
                navigate("/user-page/order-history")
              }}
              className="border border-zinc-300 text-center text-zinc-700 px-3 mt-2 rounded-md hover:bg-accent duration-200 ease-in w-1/2 mx-1 py-1"
            >
              Go to order history
            </button>
            <button
              onClick={() => {
                navigate("/")
              }}
              className="border border-zinc-300 text-center text-zinc-700 px-3 mt-2 rounded-md bg-accent/50 hover:bg-accent duration-200 ease-in w-1/2 mx-1 py-1"
            >
              Go to home page
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/")
            }}
            className="border border-zinc-300 text-center text-zinc-700 px-3 mt-6 rounded-md bg-accent/50 hover:bg-accent duration-200 ease-in w-1/2 mx-1 py-1"
          >
            Go to home page
          </button>
        )}
      </div>
    </div>
  )
}

export default TransactionSummary
