import { useEffect } from "react"
import APIService from "../services/APIService"
import { setError, setIsInitialized, setLoading, setProducts } from "../redux/productsSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../redux"
import { IProduct } from "../interfaces/interfaces"
import checkIfImageExists from "../helpers/checkImage"

function useFetchProducts() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true))

      try {
        const data = await APIService.fetchProducts()
        const productsWithValidImages = await Promise.all(
          data.map(
            (product) =>
              new Promise<IProduct | null>((resolve) => {
                checkIfImageExists(product.image_link, (exists) => {
                  resolve(exists ? product : null)
                })
              })
          )
        )
        const productsWithBrandAndImg = productsWithValidImages.filter((product) => product !== null && product.brand)
        dispatch(setProducts(productsWithBrandAndImg as IProduct[]))
        dispatch(setIsInitialized(true))
      } catch (error) {
        dispatch(
          setError(error instanceof Error ? error : new Error("Unknown error"))
        )
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dispatch])
}

export default useFetchProducts
