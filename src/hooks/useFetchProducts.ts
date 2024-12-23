/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react"
import APIService from "../services/APIService"
import { setError, setLoading, setProducts } from "../redux/productsSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../redux"

function useFetchProducts() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true))

      try {
        const data = await APIService.fetchProducts()
        dispatch(setProducts(data))
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
