import { useEffect, useState } from "react"
import { IProduct } from "../interfaces/interfaces"
import { AppDispatch, AppState } from "../redux"
import { useDispatch, useSelector } from "react-redux"
import { addProduct, deleteProduct } from "../redux/favoritesSlice"
import { userDataService } from "../services/userDataService"

export function useFavorite(product?: IProduct) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const favProducts = useSelector((state: AppState) => state.favorites.products)
  const user = useSelector((state: AppState) => state.auth.user)
  const dispatch = useDispatch<AppDispatch>()

  const checkIfFavorite = (): boolean => {
    return !!product && favProducts.some((favProduct) => favProduct.id === product.id)
  }

  useEffect(() => {
    if (product) {
      setIsFavorite(checkIfFavorite())
    }
  }, [favProducts, product])


  const toggleFavorite = () => {
    if (!product) return

    const newIsFavorite = !isFavorite
    dispatch(newIsFavorite ? addProduct(product) : deleteProduct(product))
    setIsFavorite(newIsFavorite)

    if (user) {
      if (newIsFavorite) {
        userDataService.addFavorite(user.uid, product)
      } else {
        userDataService.removeFavorite(user.uid, product)
      }
    }
  };

  return { isFavorite, toggleFavorite }
}
