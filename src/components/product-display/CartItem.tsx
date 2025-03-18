import { useShoppingCart } from "../../hooks/useShoppingCart"
import { IProduct } from "../../interfaces/interfaces"

type CartItemProps = {
  product: IProduct
  quantity: number
  selectedColor?: string
}

const CartItem = ({ product, quantity, selectedColor }: CartItemProps) => {
  const { handleDecrement, handleAddToCart, handleDelete, getColorName } =
    useShoppingCart()

  return (
    <div className="w-full bg-white border-b border-zinc-300 my-2 h-48 flex items-center">
      <div className="flex items-center p-4 w-full h-full">
        <div className="flex w-1/2 items-center mr-2">
          <img
            src={product.image_link}
            alt={product.name}
            className="w-auto h-36 object-cover "
          />
          <div className="ml-4">
            <p className="text-md font-semibold">{product.name}</p>

            {selectedColor && (
              <div className="flex items-center mt-1">
                <span
                  className="w-5 h-5 rounded-full border border-zinc-400 mr-2"
                  style={{ backgroundColor: selectedColor }}
                ></span>
                <p className="text-sm text-zinc-600">
                  {getColorName(product, selectedColor)}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-1/2 flex h-full items-center justify-between ml-2">
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handleDecrement(product, selectedColor)}
              className="border border-zinc-400 px-2 rounded-md"
            >
              −
            </button>
            <span className="text-md w-6 text-center">{quantity}</span>
            <button
              onClick={() => {
                if (quantity < 10) {
                  handleAddToCart(product, selectedColor)
                }
              }}
              disabled={quantity >= 10}
              className={`border border-zinc-400 px-2 rounded-md ${
                quantity >= 10 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              +
            </button>
            <button
              onClick={() => handleDelete(product, selectedColor)}
              className="ml-2 text-sm"
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
