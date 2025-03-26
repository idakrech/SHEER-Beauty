import { Timestamp } from "firebase/firestore"
import { Address } from "shippo"

export interface IFetchProductParams {
  brand?: string
  product_type?: string
  product_category?: string
  product_tags?: string[]
  price_greater_than?: number
  price_less_than?: number
  rating_greater_than?: number
  rating_less_than?: number
}

export interface IProductColor {
  hex_value: string
  colour_name: string
}

export interface IProduct {
  id: number
  brand: string
  name: string
  price: string
  price_sign: string | null
  currency: string | null
  image_link: string
  product_link: string
  website_link: string
  description: string
  rating: number | null
  category: string | null
  product_type: string
  tag_list: string[]
  created_at: string
  updated_at: string
  product_api_url: string
  api_featured_image: string
  product_colors: IProductColor[]
}

export interface IProductType {
  name: string
  categories: string[] | null
}

export type IAddress = Address

export interface IUserData {
  userID: string
  email: string
  address: IAddress | null
  favorites?: number[]
  cart?: {
    productId: number
    quantity: number
  }[]
  transactionIDs?: string[]
}

export interface IUser {
  uid: string
  email: string | null
  displayName: string | null
}

export interface ITransaction {
  id: string,
  cart: { product: IProduct, quantity: number, selectedColor?: string}[]
  createdAt: Timestamp
  delivery: {
    address: IAddress | undefined
    provider: string | undefined
    service: string | undefined
    rate: number | null
  }
  payment: {
    method: "card" | "applePay/googlePay" | undefined
    totalSum: number | null
  }
}
