import CartItem from "../components/product-display/CartItem"
import { useShoppingCart } from "../hooks/useShoppingCart"
import Delivery from "../components/checkout/Delivery"
import PaymentMethods from "../components/checkout/PaymentMethods"
import SideSummary from "../components/checkout/SideSummary"
import { useSelector } from "react-redux"
import { AppState } from "../redux"
import TransactionSummary from "../components/checkout/TransactionSummary"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"

const CartPage = () => {
  const { cartProducts } = useShoppingCart()
  const transactionId = useSelector((state: AppState) => state.transaction.id)

  return transactionId ? (
    <TransactionSummary />
  ) : (
    <div className="w-full py-5">
      <div className="flex flex-col justify-center w-full">
        <div className="bg-white p-4 border border-zinc-300 flex flex-col items-center justify-center">
          <h3 className="text-center text-3xl text-zinc-700 font-serif font-bold my-5">
            Checkout
          </h3>
          {!cartProducts.length && (
            <div
              className="p-5 flex flex-col items-center justify-center"
              style={{ height: "45vh" }}
            >
              <ShoppingCartOutlinedIcon fontSize="large" />
              <p className="mt-3">Your cart is empty</p>
            </div>
          )}
        </div>
        {cartProducts.length > 0 && (
          <div className="flex w-full justify-center">
            <div className="w-2/3 flex flex-col justify-center items-start my-4 mr-2">
              <div className="bg-white p-5 w-full border border-zinc-300">
                <div className="flex items-center px-4 font-normal text-sm w-full border-b border-zinc-300 pb-2">
                  <div className="w-1/2 text-left">Article</div>
                  <div className="w-1/4 text-left ml-4">Quantity</div>
                  <div className="w-1/4 text-right">Sum</div>
                </div>

                {cartProducts.map(({ product, quantity, selectedColor }) => (
                  <CartItem
                    key={product.id}
                    product={product}
                    quantity={quantity}
                    selectedColor={selectedColor}
                  />
                ))}
              </div>
              <Delivery />
              <PaymentMethods />
            </div>
            <div className="w-1/3 flex flex-col bg-white p-5 border border-zinc-300 mt-4 mb-8 ml-2">
              <SideSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
