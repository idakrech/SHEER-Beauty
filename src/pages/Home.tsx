import { useSelector } from "react-redux"
import ProductGrid from "../components/product-display/ProductGrid"
import { useEffect, useState } from "react"
import { IProduct } from "../interfaces/interfaces"
import APIService from "../services/APIService"
import { AppState } from "../redux"

const Home = () => {
  const state = useSelector((state: AppState) => state)
  const [productsByFilter, setProductsByFilter] = useState<{
    [key: string]: IProduct[]
  }>({}) // example:
  // {
  //   grid1: [prod1, prod2, prod3],
  //   grid2: [prod4, prod5],
  //   grid6: [prod6]
  // }

  // Here I fetch and render products directly from API and there is no use of app state here.
  // This is due to long loading time when saving all api products in app state on app launch.
  // That long process of uploading api products into state runs in the background while products in Home page appear right away.
  useEffect(() => {
    state.filters.forEach(async (filter) => {
      try {
        const products = await APIService.fetchProducts(filter.fetchParams)

        setProductsByFilter((prevState) => ({
          ...prevState,
          [filter.gridID]: products,
        }))
      } catch (error) {
        console.error(
          "Error fetching products for filter:",
          filter.gridID,
          error
        )
      }
    })
  }, [state.filters])

  return (
    <>
      {Object.keys(productsByFilter).map((gridID) => {
        const filter = state.filters.find((f) => f.gridID === gridID)

        if (!filter) return null

        return (
          <div key={gridID}>
            <h1>{filter.title}</h1>
            <ProductGrid
              products={productsByFilter[gridID]}
              isExpanded={false}
              category={gridID}
              maxLimit={9}
            />
          </div>
        )
      })}
    </>
  )
}

export default Home
