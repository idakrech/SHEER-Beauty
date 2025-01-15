import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { AppState } from "../redux"
import { removeFirstWord } from "../helpers/removeFirstWord"
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material"
import { useShoppingCart } from "../hooks/useShoppingCart"
import { useCartItem } from "../hooks/useCartItem"
import { useFavorite } from "../hooks/useFavorite"

const ProductPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const productID = searchParams.get("id")
  const parsedID = productID ? parseInt(productID) : undefined
  const product = useSelector((state: AppState) =>
    state.products.products.find((p) => p.id === parsedID)
  )
  const { handleAddToCart, handleDecrement } = useShoppingCart()
  const { quantity } = useCartItem(product)
  const {isFavorite, toggleFavorite} = useFavorite(product)

  return (
    <div>
      {product && (
        <div className="flex py-5">
          <div className="flex w-1/2 justify-center items-center">
            <img
              src={product.api_featured_image}
              className="w-full border border-slate-200"
            />
          </div>

          <div className="w-1/2 text-left py-2 px-5">
            <p className="font-light uppercase">{product.brand}</p>
            <p className="text-xl font-semibold py-5">
              {removeFirstWord(product.name)}
            </p>
            {/* TODO: rating as star icons */}
            {product.rating && <p>{product.rating}</p>}
            <p className="text-xl font-semibold">{product.price}$</p>
            <p className="py-5">{product.description}</p>
            <div className="flex">
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
              {quantity > 0 ? (
                <div className="flex gap-1 text-md items-end">
                  <button onClick={() => handleDecrement(product)}>-</button>
                  <div>
                    <button onClick={() => handleAddToCart(product)}>
                      <ShoppingCart
                        fontSize="small"
                        sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                      />
                    </button>
                    <p>{quantity}</p>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>+</button>
                </div>
              ) : (
                <button onClick={() => handleAddToCart(product)}>
                  <ShoppingCartOutlined
                    fontSize="small"
                    sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                  />
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
