import axios from "axios"
import buildURL from "../helpers/buildURL"
import { FetchProductParams, Product } from "../types/interfaces"

const BASE_URL = "http://makeup-api.herokuapp.com/api/v1/products.json"

export async function fetchProducts(
  params: FetchProductParams
): Promise<Product[]> {
  const url = buildURL(BASE_URL, params)

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}
