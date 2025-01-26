import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AppState } from "../../redux"

const Payment = () => {
  const navigate = useNavigate()
  const user = useSelector((state: AppState) => state.auth.user)

  return (
  <div>
    <p>Payment</p>
    {user && <button onClick={() => navigate("/user-page/order-history")}>Go to orders</button>}
    </div>
)
}

export default Payment
