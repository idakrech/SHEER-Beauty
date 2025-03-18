import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { AppState } from "../redux"
import { removeFirstWord } from "../helpers/removeFirstWord"
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
  Star,
  StarBorder,
} from "@mui/icons-material"
import { useShoppingCart } from "../hooks/useShoppingCart"
import { useFavorite } from "../hooks/useFavorite"
import { formatDescription } from "../helpers/formatDescription"
import { Tooltip } from "@mui/material"
import { useState } from "react"

const ProductPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const productID = searchParams.get("id")
  const parsedID = productID ? parseInt(productID) : undefined
  const product = useSelector((state: AppState) =>
    state.products.products.find((p) => p.id === parsedID)
  )
  const { handleAddToCart, handleDecrement } = useShoppingCart()
  const { isFavorite, toggleFavorite } = useFavorite(product)
  const rating = product?.rating || 0
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.product_colors.length
      ? product.product_colors[0].hex_value
      : undefined
  )
  const cart = useSelector((state: AppState) => state.cart.products)
  const { quantity } = cart.find(
    (item) =>
      item.product.id === product?.id && item.selectedColor === selectedColor
  ) || { quantity: 0 }

  return (
    <div>
      {product && (
        <div className="flex py-5">
          <div className="flex w-1/2 justify-center items-center relative">
            <img
              src={product.image_link}
              className="w-full border border-slate-200"
            />
            <button
              onClick={() => toggleFavorite()}
              className="absolute top-2 right-2 bg-white/75 rounded-full p-1"
            >
              {!isFavorite ? (
                <FavoriteBorderOutlined
                  fontSize="large"
                  sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                />
              ) : (
                <FavoriteOutlined
                  fontSize="large"
                  sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                />
              )}
            </button>
          </div>

          <div className="w-1/2 text-left py-2 px-5">
            <p className="font-light uppercase">{product.brand}</p>
            <p className="text-xl font-semibold font-serif py-5">
              {removeFirstWord(product.name, product.brand)}
            </p>
            <p className="text-xl font-semibold font-serif">${product.price}</p>

            {product.rating && (
              <div className="flex pt-5">
                {Array.from({ length: 5 }, (_, i) => {
                  const fillPercentage =
                    Math.min(Math.max(rating - i, 0), 1) * 100

                  return (
                    <div key={i} className="relative w-6 h-6">
                      <StarBorder className="absolute text-accent" />
                      <Star
                        className="absolute text-accent"
                        style={{
                          clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            )}

            <p className="pt-5 pb-2">{formatDescription(product.description)}</p>

            {product.product_colors.length > 0 && (
              <div className="flex items-center gap-2 py-3">
                {product.product_colors.map((color, index) => (
                  <Tooltip title={color.colour_name}>
                    <div
                      key={index}
                      className={`w-6 h-6 rounded-full border border-gray-300 ${
                        selectedColor === color.hex_value
                          ? "ring-2 ring-accent"
                          : ""
                      }`}
                      style={{ backgroundColor: color.hex_value }}
                      onClick={() => setSelectedColor(color.hex_value)}
                    ></div>
                  </Tooltip>
                ))}
              </div>
            )}

            <div className="flex py-3">
              {quantity > 0 ? (
                <div className="flex gap-1 text-md items-end bg-accent/50 py-2 px-4 rounded-md justify-center items-center">
                  <ShoppingCart
                    fontSize="small"
                    sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                  />
                  <button onClick={() => handleDecrement(product, selectedColor)}>
                    <div className="rounded-full border border-zinc-300 bg-accent w-4 h-4 flex items-center justify-center pb-[3px] ml-2 mr-1">
                      -
                    </div>
                  </button>
                  <p className="text-center">{quantity}</p>
                  <button
                    onClick={() => handleAddToCart(product, selectedColor)}
                  >
                    <div className="rounded-full border border-zinc-300 bg-accent w-4 h-4 flex items-center justify-center ml-1">
                      +
                    </div>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAddToCart(product, selectedColor)}
                  className="flex w-auto border border-zinc-300 text-center py-1 px-3 rounded-md bg-accent hover:bg-dark duration-200 ease-in"
                >
                  <div>
                    <ShoppingCartOutlined
                      fontSize="small"
                      sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                    />
                  </div>
                  <p className="ml-2">Add to cart</p>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductPage
