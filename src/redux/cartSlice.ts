/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IProduct } from "../interfaces/interfaces"

interface ICartState {
  products: {
    product: IProduct
    quantity: number
    selectedColor?: string
  }[]
  loading: boolean
  error: Error | null
}

const initialState: ICartState = {
  products: [],
  loading: false,
  error: null,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //for products fetched from user data db
    setProducts(
      state,
      action: PayloadAction<
        {
          product: IProduct
          quantity: number
        }[]
      >
    ) {
      if (action.payload.length === 0) {
        state.products = []
      } else {
        const newProducts = action.payload.filter(
          (newProduct) =>
            !state.products.some(
              (existingProduct) => existingProduct.product.id === newProduct.product.id
            )
        )
        state.products = [...state.products, ...newProducts]
      }
      state.loading = false
      state.error = null
    },
    addProduct(state, action: PayloadAction<{product: IProduct, selectedColor?: string}>) {
      const { product, selectedColor } = action.payload
      const existingProduct = state.products.find(
        (existingProduct) => existingProduct.product.id === product.id  && existingProduct.selectedColor === selectedColor
      )
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        state.products.push({ product, quantity: 1, selectedColor })
      }
    },
    deleteProduct(state, action: PayloadAction<{product: IProduct, selectedColor?: string}>) {
      state.products = state.products.filter(
        (existingProduct) => 
          !(existingProduct.product.id === action.payload.product.id &&
            existingProduct.selectedColor === action.payload.selectedColor)
      )
    },
    decrementProductQuantity(state, action: PayloadAction<{product: IProduct, selectedColor?: string}>) {
      const product = state.products.find(
        (existingProduct) => 
          existingProduct.product.id === action.payload.product.id &&
          existingProduct.selectedColor === action.payload.selectedColor
      )


      if (product) {
        product.quantity -= 1
        if (product.quantity === 0) {
          state.products = state.products.filter(
            (existingProduct) => 
              !(existingProduct.product.id !== action.payload.product.id &&
                existingProduct.selectedColor === action.payload.selectedColor
              )
          )
        }
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<Error>) {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  setProducts,
  addProduct,
  deleteProduct,
  decrementProductQuantity,
  setError,
  setLoading,
} = cartSlice.actions
