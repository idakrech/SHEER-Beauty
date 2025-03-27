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
    <div className="w-full bg-white border-b border-zinc-300 my-2 md:p-3 flex flex-col md:flex-row items-center">
      <div className="flex w-full md:w-1/2 gap-4 items-center">
        <img
          src={product.image_link}
          alt={product.name}
          className="w-auto h-36 object-cover "
        />

        <div>
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
           <p className="md:hidden block text-xl font-bold font-serif text-gray-800 md:ml-4 mt-2 md:mt-0">
          {product.price_sign ?? "$"}
          {(Number(product.price) * quantity).toFixed(2)}
        </p>
        </div>
      </div>

      <div className="md:w-1/2 w-full flex flex-col md:flex-row h-full items-start md:items-center md:justify-between mt-3 md:mt-0 mb-4 md:mb-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleDecrement(product, selectedColor)}
            className="border border-zinc-400 px-3 py-1 rounded-md text-lg"
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
            className={`border border-zinc-400 px-3 rounded-md text-lg ${
              quantity >= 10 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            +
          </button>

          <button
          onClick={() => handleDelete(product, selectedColor)}
          className="md:hidden block ml-2 text-sm"
        >
          Remove
        </button>
        </div>

        <button
          onClick={() => handleDelete(product, selectedColor)}
          className="hidden md:block ml-2 text-sm"
        >
          Remove
        </button>

        <p className="hidden md:block text-xl font-bold font-serif text-gray-800 md:ml-4 mt-2 md:mt-0">
          {product.price_sign ?? "$"}
          {(Number(product.price) * quantity).toFixed(2)}
        </p>

       
      </div>
    </div>
  )
}
export default CartItem
