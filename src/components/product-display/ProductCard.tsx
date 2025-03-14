import { IProduct } from "../../interfaces/interfaces"
import { Link } from "react-router-dom"
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material"
import { removeFirstWord } from "../../helpers/removeFirstWord"
import { useShoppingCart } from "../../hooks/useShoppingCart"
import { useCartItem } from "../../hooks/useCartItem"
import { useFavorite } from "../../hooks/useFavorite"
import { useState } from "react"
import useEmblaCarousel from "embla-carousel-react"

const ProductCard = (props: IProduct) => {
  const { handleAddToCart, handleDecrement } = useShoppingCart()

  const { isFavorite, toggleFavorite } = useFavorite(props)
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    props.product_colors.length ? props.product_colors[0].hex_value : undefined
  )
  const { quantity } = useCartItem(props, selectedColor)
  const [emblaRef] = useEmblaCarousel({ axis: "x", dragFree: true })

  return (
    <div className="w-full h-[450px] bg-white border border-gray-300 duration-500 hover:scale-105 shadow-md flex flex-col justify-between">
      <div className="flex justify-end p-2">
        <button onClick={() => toggleFavorite()}>
          {!isFavorite ? (
            <FavoriteBorderOutlined
              fontSize="small"
              sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
            />
          ) : (
            <FavoriteOutlined
              fontSize="small"
              sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
            />
          )}
        </button>
      </div>

      <div className="flex justify-center pb-5">
        <Link to={`/product-page?id=${props.id}`}>
          <img
            src={props.image_link}
            alt={`${props.name} image`}
            className="object-cover h-64"
          />
        </Link>
      </div>

      <div className="px-4 py-3 w-full bg-gradient-to-t from-accent/25 to-white flex flex-col justify-between h-full">
        <span className="block font-outfit text-gray-400 uppercase text-xs text-center">
          {props.brand}
        </span>
        <p className="font-sans font-normal text-md text-left text-gray-800 truncate block capitalize"> 
          {removeFirstWord(props.name, props.brand)}
        </p>

        {props.product_colors.length > 1 && (
          <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex space-x-2">
              {props.product_colors.map((color, index) => (
                <div
                  key={index}
                  className={`w-5 h-5 mt-2 rounded-full border border-gray-300 flex-shrink-0 ${
                    selectedColor === color.hex_value
                      ? "ring-2 ring-accent border-gray-600"
                      : ""
                  }`}
                  style={{ backgroundColor: color.hex_value }}
                  onClick={() => setSelectedColor(color.hex_value)}
                ></div>
              ))}
            </div>
          </div>
        )
        }

        <div className="flex justify-between items-center">
          <p className="font-serif 7text-md font-bold text-gray-800 cursor-auto my-3">
            {props.price_sign ? props.price_sign : "$"}
            {props.price}
          </p>

          {quantity > 0 ? (
            <div className="flex gap-1 text-md items-end">
              <button onClick={() => handleDecrement(props)}>-</button>
              <div>
                <button onClick={() => handleAddToCart(props, selectedColor)}>
                  <ShoppingCart
                    fontSize="small"
                    sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                  />
                </button>
                <p>{quantity}</p>
              </div>
              <button onClick={() => handleAddToCart(props, selectedColor)}>
                +
              </button>
            </div>
          ) : (
            <button onClick={() => handleAddToCart(props, selectedColor)}>
              <ShoppingCartOutlined
                fontSize="small"
                sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
