/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import { IProduct } from "../interfaces/interfaces"
import checkIfImageExists from "../helpers/checkImage"
import PlaceholderImg from "../assets/placeholder.png"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addProduct as addToCart } from "../redux/cartSlice"
import {
  addProductID as addToFavs,
  deleteProductID as removeFromFavs,
} from "../redux/favoritesSlice"
import { AppDispatch, AppState } from "../redux"
import { userDataService } from "../services/userDataService"

const ProductCard = (props: IProduct) => {
  const [imgExists, setImgExists] = useState<boolean | null>(null)
  const [isFavorite, setIsFavorite] = useState<boolean>()
  const favProductIDs = useSelector(
    (state: AppState) => state.favorites.productIDs
  )
  const user = useSelector((state: AppState) => state.auth.user)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    checkIfImageExists(props.image_link, (exists: boolean) => {
      setImgExists(exists)
    })
    setIsFavorite(checkIfFavorite)
  }, [props.id, favProductIDs])

  const checkIfFavorite = (): boolean => {
    console.log("hello from useEffect")
    return favProductIDs.some((id) => props.id === id)
  }


  const handleAddToCartBtn = () => {
    dispatch(addToCart(props.id))
    if (user !== null) {
      userDataService.addToCart(user.uid, {productId: props.id, quantity: 1})
    }
  }

  const handleAddToFavsBtn = () => {
    const newIsFavorite = !isFavorite
    dispatch(newIsFavorite ? addToFavs(props.id) : removeFromFavs(props.id))
    setIsFavorite(newIsFavorite)

    if (user !== null) {
      if (newIsFavorite) {
         userDataService.addFavorite(user.uid, props.id)
      } else {
        userDataService.removeFavorite(user.uid, props.id)
      }
    }
  }
  

  return (
    // <div className='flex justify-center align-center'>
    //     <img src={props.image_link} className='object-cover'/>
    //     <h3>{props.name}</h3>
    //     <p>{props.brand}</p>
    //     <h3>{props.price}</h3>
    // </div>
    <Link to={`/product-page?id=${props.id}`}>
      <div className="w-72 bg-white duration-500 hover:scale-105 border border-gray-300">
        <a href="#">
          <div className="flex justify-center py-10">
            {imgExists === null ? (
              <p>Loading...</p>
            ) : imgExists ? (
              <img src={props.image_link} alt="Product photo" />
            ) : (
              <img src={PlaceholderImg} />
            )}
          </div>

          <div className="px-4 py-3 w-72 bg-gray-100">
            <span className="text-gray-400 mr-3 uppercase text-xs">
              {props.brand}
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              {props.name}
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                {props.price_sign ? props.price_sign : "$"}
                {props.price}
              </p>
              <button onClick={() => handleAddToCartBtn()}>TO CART</button>
              <button onClick={() => handleAddToFavsBtn()}>
                {!isFavorite ? <p>ADD FAV</p> : <p>REMOVE FAV</p>}
              </button>

              {/* for old price */}
              {/* <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                    </del> */}

              <div className="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-bag-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                  />
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
              </div>
            </div>
          </div>
        </a>
      </div>
    </Link>
  )
}

export default ProductCard
