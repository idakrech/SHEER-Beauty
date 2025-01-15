import CartItem from "../components/product-display/CardItem"
import { useShoppingCart } from "../hooks/useShoppingCart"

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
          <button>Checkout</button>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  )
}

export default CartPage
