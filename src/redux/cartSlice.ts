/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { setProductIDs } from "./filterSlice"

interface ICartState {
  products: {
    id: number
    quantity: number
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
          id: number
          quantity: number
        }[]
      >
    ) {
      if (state.products.length > 0) {
        const updatedProducts = state.products.filter(
          (product) => !action.payload.some((p) => p === product)
        )
        state.products = [...updatedProducts, ...action.payload]
      } else {
        state.products = action.payload
      }
      state.loading = false
      state.error = null
    },
    addProduct(state, action: PayloadAction<number>) {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload
      )
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        state.products.push({ id: action.payload, quantity: 1 })
      }
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      )
    },
    decrementProductQuantity(state, action: PayloadAction<number>) {
      const product = state.products.find(
        (product) => product.id === action.payload
      )
      if (product) {
        product.quantity -= 1
        if (product.quantity === 0) {
          state.products = state.products.filter((p) => p.id !== action.payload)
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
  addProduct,
  deleteProduct,
  decrementProductQuantity,
  setError,
  setLoading,
} = cartSlice.actions
