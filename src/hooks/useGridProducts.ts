import { useSelector } from "react-redux";
import { AppState } from "../redux";
import { useEffect, useState } from "react";
import { gridConfig } from "../config/gridConfig";
import APIService from "../services/APIService";
import { IProduct } from "../interfaces/interfaces";
import checkIfImageExists from "../helpers/checkImage";
import { IFilterState } from "../redux/filterSlice";

export function useGridProducts(isInitialized: boolean) {
    const products = useSelector((state: AppState) => state.products.products)
    const [gridProducts, setGridProducts] = useState<{
        [key: string]: IProduct[]
      }>({}) // example:
            // {
            //   grid1: [prod1, prod2, prod3],
            //   grid2: [prod4, prod5],
            //   grid6: [prod6]
            // }

    // Here I fetch and render products directly from API if it is the initial launch of the app.
    // This is due to long loading time when saving all api products in app state on app launch.
    // That long process of uploading api products into state runs in the background while products in Home page appear right away.
    // However if it is not an initial launch, the products are fetched from state. 

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
          setGridProducts(updatedProducts)
        }
    
        if (!isInitialized) {
          fetchProducts()
        } else {
          const updatedProducts: { [key: string]: IProduct[] } = {}
          for (const grid of gridConfig) { 
            const filters: IFilterState = {
              type: grid.type,
              category: grid.category,
              selectedBrands: [grid.brand],
              selectedTags: grid.tags,
              selectedColors: [],
              priceRange: {min: grid.priceRange.min, max: grid.priceRange.max}
            }
            updatedProducts[grid.title] = products.filter((product) => {
                const matchesType = filters.type ? product.product_type?.toLowerCase() === filters.type.toLowerCase() : true
                const matchesCategory = filters.category
                  ? product.category?.toLowerCase() === filters.category.toLowerCase()
                  : true
                const matchesBrands =
                  filters.selectedBrands.length === 0 ||
                  filters.selectedBrands.includes(product.brand?.toLowerCase())
                const matchesTags =
                  filters.selectedTags.length === 0 ||
                  filters.selectedTags.some((tag) =>
                    product.tag_list?.map(t => t.toLowerCase()).includes(tag.toLowerCase())
                  )
                const matchesPrice =
                  parseFloat(product?.price) >= filters.priceRange.min &&
                  parseFloat(product?.price) <= filters.priceRange.max
                return matchesType && matchesCategory && matchesBrands && matchesTags && matchesPrice
              })
          }
          setGridProducts(updatedProducts)
        }
      }, [isInitialized, products])

      return gridProducts
}