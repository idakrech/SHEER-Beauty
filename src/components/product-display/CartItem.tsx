import { useShoppingCart } from "../../hooks/useShoppingCart"
import { IProduct } from "../../interfaces/interfaces"

type CartItemProps = {
  product: IProduct
  quantity: number
}

const CartItem = ({ product, quantity }: CartItemProps) => {
  const { handleDecrement, handleAddToCart, handleDelete } = useShoppingCart()

  return (
    <div className="w-full bg-white border-b border-zinc-300 my-2 h-48 flex items-center text-zinc-700">
      <div className="flex items-center p-4 w-full h-full">
        <div className="flex w-1/2 items-center mr-2">
          <img
            src={product.image_link}
            alt={product.name}
            className="w-auto h-36 object-cover " //border border-zinc-300
          />
          <div className="ml-4">
            <p className="text-md font-semibold">
              {product.name}
            </p>
          </div>
        </div>

        <div className="w-1/2 flex h-full items-center justify-between ml-2">
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handleDecrement(product)}
              className="border border-gray-400 px-2 rounded-md"
            >
              −
            </button>
            <span className="text-md w-6 text-center">{quantity}</span>
            <button
              onClick={() => {
                if (quantity < 10) {
                  handleAddToCart(product)
                }
              }}
              disabled={quantity >= 10}
              className={`border border-gray-400 px-2 rounded-md ${
                quantity >= 10 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              +
            </button>
            <button
              onClick={() => handleDelete(product)}
              className="ml-2 text-zinc-700 text-sm"
            >
              Remove
            </button>
          </div>

          <p className="text-right text-xl font-bold font-serif text-gray-800">
            {product.price_sign ?? "$"}
            {(Number(product.price) * quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
export default CartItem
