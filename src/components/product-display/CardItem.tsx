import { IProduct } from "../../interfaces/interfaces"
import ProductCard from "./ProductCard"

type CartItemProps = {
  product: IProduct
  quantity: number
  handleDelete: (product: IProduct) => void
  handleDecrement: (product: IProduct) => void
}

const CartItem = ({
  product,
  quantity,
  handleDelete,
  handleDecrement,
}: CartItemProps) => {
  return (
    <div>
      <ProductCard {...product} />
      <p>Quantity: {quantity}</p>
      <button onClick={() => handleDelete(product)}>Remove</button>
      <button onClick={() => handleDecrement(product)}>Decrement</button>
    </div>
  )
}
export default CartItem
