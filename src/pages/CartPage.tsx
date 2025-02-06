import CartItem from "../components/product-display/CartItem"
import { useShoppingCart } from "../hooks/useShoppingCart"
import Delivery from "../components/checkout/Delivery"
import Payment from "../components/checkout/Payment"

const CartPage = () => {
  const { cartProducts, handleDelete, handleDecrement } = useShoppingCart()

  return (
    <div>
      {cartProducts.length > 0 ? (
        <>
          {cartProducts.map(({ product, quantity }) => (
            <CartItem
              key={product.id}
              product={product}
              quantity={quantity}
              handleDelete={handleDelete}
              handleDecrement={handleDecrement}
            />
          ))}
          <Delivery/>
          <Payment/>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  )
}

export default CartPage
