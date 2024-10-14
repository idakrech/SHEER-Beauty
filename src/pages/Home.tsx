/* eslint-disable @typescript-eslint/no-unused-vars */
import useFetchProducts from "../hooks/useFetchProducts";
import { useSelector } from "react-redux";
import { AppState } from "../redux";
import { filterProducts } from "../utils/filterProducts";

const Home = () => {
  const state = useSelector((state: AppState) => state)
  const filterParams = state.filters.map((f) => f.fetchParams)

  useFetchProducts(filterParams) 

  return <>{filterProducts(state)}</>
}

export default Home
