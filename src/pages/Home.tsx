import ProductGrid from "../components/product-display/ProductGrid"
import { useEffect, useState } from "react"
import { IProduct } from "../interfaces/interfaces"
import APIService from "../services/APIService"
import { gridConfig } from "../config/gridConfig"

const Home = () => {
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
    const fetchProducts = async () => {
      const updatedProducts: { [key: string]: IProduct[] } = {}

      for (const grid of gridConfig) {
        try {
          const products = await APIService.fetchProducts(grid.filters)

          updatedProducts[grid.title] = products;
        } catch (error) {
          console.error(
            "Error fetching products for filter:",
            grid.title,
            error
          )
        }
      }

      setProductsByFilter(updatedProducts)
    }

    fetchProducts()
  }, [])

  return (
    <>
      {gridConfig.map((grid) => {
        const products = productsByFilter[grid.title] || []

        return (
          <div key={grid.title}>
            <h1>{grid.title}</h1>
            <ProductGrid
              products={products}
              isExpanded={false}
              category={grid.title}
              maxLimit={9}
            />
          </div>
        )
      })}
    </>
  )
}
export default Home
