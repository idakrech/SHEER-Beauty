import CartItem from "../components/product-display/CartItem"
import { useShoppingCart } from "../hooks/useShoppingCart"
import Delivery from "../components/checkout/Delivery"
import PaymentMethods from "../components/checkout/PaymentMethods"
import { useState } from "react"
import { IAddress } from "../interfaces/interfaces"

const CartPage = () => {
  const { cartProducts, priceSum } = useShoppingCart()
  const [selectedRate, setSelectedRate] = useState<number>(0)
  const totalSum = selectedRate ? priceSum + selectedRate : priceSum
  const [shipmentAddress, setShipmentAddress] = useState<IAddress>({
    name: "",
    street1: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    phone: "",
  })

  return (
    <div className="w-full py-5">
      <h3 className="text-center text-3xl text-zinc-700 font-serif font-bold my-5">
        Checkout
      </h3>
      <div className="flex justify-center">
        {cartProducts.length > 0 ? (
          <div className="w-2/3 flex flex-col justify-center items-start my-4">
            <div className="bg-white p-5 w-full border border-zinc-300">
              <div className="flex items-center px-4 font-normal text-gray-700 text-sm w-full border-b border-zinc-300 pb-2">
                <div className="w-1/2 text-left">Article</div>
                <div className="w-1/4 text-left ml-4">Quantity</div>
                <div className="w-1/4 text-right">Sum</div>
              </div>

              {cartProducts.map(({ product, quantity }) => (
                <CartItem
                  key={product.id}
                  product={product}
                  quantity={quantity}
                />
              ))}
            </div>

            <Delivery
              setSelectedRate={setSelectedRate}
              setShipmentAddress={setShipmentAddress}
            />
            <PaymentMethods
              totalSum={totalSum}
              shipmentAddress={shipmentAddress}
            />
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  )
}

export default CartPage
