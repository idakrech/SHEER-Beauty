import ProductGrid from "../components/product-display/ProductGrid"
import { useEffect, useState } from "react"
import { IProduct } from "../interfaces/interfaces"
import APIService from "../services/APIService"
import { gridConfig } from "../config/gridConfig"
import checkIfImageExists from "../helpers/checkImage"
import { IFilterState } from "../redux/filterSlice"

//RANO: Dlaczego filtracja z paramów na category page nie działa? + commity

const Home = () => {
  const [productsByFilter, setProductsByFilter] = useState<{
    [key: string]: IProduct[]
  }>({}) 
  // example:
  // {
  //   grid1: [prod1, prod2, prod3],
  //   grid2: [prod4, prod5],
  //   grid6: [prod6]
  // }

  // Here I fetch and render products directly from API and there is no use of app state here.
  // This is due to long loading time when saving all api products in app state on app launch.
  // That long process of uploading api products into state runs in the background while products in Home page appear right away.

  //TODO: check if initialRender. If not, fetch grid products from state
  useEffect(() => {
    const fetchProducts = async () => {
      const updatedProducts: { [key: string]: IProduct[] } = {}

      for (const grid of gridConfig) {
        try {
          const products = await APIService.fetchProducts({
            product_type: grid.type,
            product_category: grid.category,
            brand: grid.brand,
            product_tags: grid.tags,
            price_less_than: grid.priceRange.max,
            price_greater_than: grid.priceRange.min,
          })

          const productsWithValidImages = await Promise.all(
            products.map(
              (product) =>
                new Promise<IProduct | null>((resolve) => {
                  checkIfImageExists(product.image_link, (exists) => {
                    resolve(exists ? product : null)
                  })
                })
            )
          )
          const productsWithBrandAndImg = productsWithValidImages.filter((product) => product !== null && product.brand)

          updatedProducts[grid.title] = productsWithBrandAndImg as IProduct[]
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
  }, [productsByFilter])

  return (
    <>
      {gridConfig.map((grid) => {
        const products = productsByFilter[grid.title] || []
        const filters: IFilterState = {
          type: grid.type,
          category: grid.category,
          selectedBrands: grid.brand ? [grid.brand] : [],
          selectedColors: [],
          selectedTags: grid.tags,
          priceRange: grid.priceRange
        }

        return (
          <div key={grid.title}>
            <ProductGrid
              products={products}
              isExpanded={false}
              maxLimit={9}
              title={grid.title}
              filters={filters}
            />
          </div>
        )
      })}
    </>
  )
}
export default Home
