import { useShoppingCart } from "../../hooks/useShoppingCart"
import { IProduct } from "../../interfaces/interfaces"

type TransactionItemProps = {
  product: IProduct
  quantity: number
  selectedColor?: string
}

const TransactionItem = ({
  product,
  quantity,
  selectedColor,
}: TransactionItemProps) => {
  const { getColorName } = useShoppingCart()

  return (
    <div className="w-full bg-white border-b border-zinc-300 my-2 md:p-3 flex flex-col md:flex-row items-center">
      <div className="flex flex-col md:flex-row md:w-1/2 gap-4 items-center">
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
      <div className="w-full md:w-1/2 flex flex-col md:flex-row h-full md:items-center sitems-start md:justify-between mt-3 md:mt-0 mb-4 md:mb-0 md:pr-1">
        <p className="md:hidden text-md text-left">Quantity: {quantity}</p>
        <p className="hidden md:block md:w-1/2 text-center text-md text-center">
          {quantity}
        </p>
        <p className="hidden md:block md:w-1/2 text-xl font-bold font-serif text-gray-800 ml-4 md:ml-0 mt-2 md:mt-0 text-right">
          {product.price_sign ?? "$"}
          {(Number(product.price) * quantity).toFixed(2)}
        </p>
      </div>
    </div>
  )
}
export default TransactionItem
