/* eslint-disable @typescript-eslint/no-unused-vars */
import useFetchProducts from "../hooks/useFetchProducts"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../redux"
import { filterProducts } from "../utils/filterProducts"
import CategoryList from "../components/CategoryList"
import { useEffect } from "react"
import { resetProducts } from "../redux/productsSlice"

const Home = () => {
  const state = useSelector((state: AppState) => state)
  const filterParams = state.filters.map((f) => f.fetchParams)
  const dispatch = useDispatch<AppDispatch>()

  useFetchProducts(filterParams)

  useEffect(() => {
    return () => {
      dispatch(resetProducts())
    }
  }, [dispatch])
  

  return (
    <>
      {filterProducts(state)}
    </>
  )
}

export default Home
