import CartItem from "../components/product-display/CartItem"
import { useShoppingCart } from "../hooks/useShoppingCart"
import Delivery from "../components/checkout/Delivery"
import CardPayment from "../components/checkout/CardPayment"

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
          <CardPayment/>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  )
}

export default CartPage
