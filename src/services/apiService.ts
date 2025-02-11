import axios from "axios"
import buildURL from "../helpers/buildURL"
import { IFetchProductParams, IProduct } from "../interfaces/interfaces"



const APIService = (
  () => {
    const BASE_URL = "https://makeup-api.herokuapp.com/api/v1/products.json"

    async function fetchProducts(
      params?: IFetchProductParams
    ): Promise<IProduct[]> {
      const url = params ? buildURL(BASE_URL, params) : BASE_URL
    
      try {
        const response = await axios.get(url)
        return response.data
      } catch (error) {
        console.error("Error fetching products:", error)
        throw error
      }
    }

    return {
      fetchProducts
    }
  }
)()

export default APIService


