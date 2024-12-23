/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import { IProduct } from "../../interfaces/interfaces"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addProduct as addToCart } from "../../redux/cartSlice"
import {
  addProduct as addToFavs,
  deleteProduct as removeFromFavs,
} from "../../redux/favoritesSlice"
import { AppDispatch, AppState } from "../../redux"
import { userDataService } from "../../services/userDataService"
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material"
import { removeFirstWord } from "../../helpers/removeFirstWord"

const ProductCard = (props: IProduct) => {
  const [isFavorite, setIsFavorite] = useState<boolean>()
  const favProducts = useSelector((state: AppState) => state.favorites.products)
  const user = useSelector((state: AppState) => state.auth.user)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setIsFavorite(checkIfFavorite)
  }, [props.id, favProducts])

  const checkIfFavorite = (): boolean => {
    return favProducts.some((product) => props.id === product.id)
  }

  const handleAddToCartBtn = () => {
    dispatch(addToCart(props))
    if (user !== null) {
      userDataService.addToCart(user.uid, { product: props, quantity: 1 })
    }
  }

  const handleAddToFavsBtn = () => {
    const newIsFavorite = !isFavorite
    dispatch(newIsFavorite ? addToFavs(props) : removeFromFavs(props))
    setIsFavorite(newIsFavorite)

    if (user !== null) {
      if (newIsFavorite) {
        userDataService.addFavorite(user.uid, props)
      } else {
        userDataService.removeFavorite(user.uid, props)
      }
    }
  }

  return (
    <div className="w-full bg-white border border-slate-100 duration-500 hover:scale-105">
        <div className="flex justify-end p-2">
          <button onClick={() => handleAddToFavsBtn()}>
            {!isFavorite ? (
              <FavoriteBorderOutlined fontSize="small" sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}/>
            ) : (
              <FavoriteOutlined fontSize="small" sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}/>
            )}
          </button>
        </div>
        <div className="flex justify-center pb-5">
          <Link to={`/product-page?id=${props.id}`}>
            <img
              src={props.image_link}
              alt={`${props.name} image`}
              className="object-cover"
            />
          </Link>
        </div>

        <div className="px-4 py-3 w-full bg-slate-50">
          <span className="font-outfit text-gray-400 uppercase text-xs">
            {props.brand}
          </span>
          <p className="font-outfit font-normal text-md text-left text-black truncate block capitalize">
            {removeFirstWord(props.name)}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-md font-bold text-black cursor-auto my-3">
              {props.price_sign ? props.price_sign : "$"}
              {props.price}
            </p>

            <button onClick={() => handleAddToCartBtn()}>
              <ShoppingCartOutlined fontSize="small" sx={{ stroke: "#ffffff", strokeWidth: 0.5 }} />
            </button>
          </div>
        </div>
    </div>
  )
}

export default ProductCard
