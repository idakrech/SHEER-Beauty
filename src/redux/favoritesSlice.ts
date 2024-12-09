import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IProduct } from "../interfaces/interfaces"

export interface IFavoritesState {
  products: IProduct[]
  loading: boolean
  error: Error | null
}

const initialState: IFavoritesState = {
  products: [],
  loading: false,
  error: null,
}

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    //for products fetched from user data db
    setProducts(state, action: PayloadAction<IProduct[]>) {
      if (action.payload.length === 0) {
        state.products = []
      } else if (state.products.length > 0) {
        const updatedProducts = state.products.filter(
          (product) => !action.payload.some((newProduct) => newProduct.id === product.id)
        )
        state.products = [...updatedProducts, ...action.payload]
      } else {
        state.products = action.payload
      }
      state.loading = false
      state.error = null
    },
    addProduct(state, action: PayloadAction<IProduct>) {
      if (!state.products.some((product) => action.payload.id === product.id)) {
        state.products = [...state.products, action.payload]
      }
    },
    deleteProduct(state, action: PayloadAction<IProduct>) {
      if (state.products.some((product) => action.payload.id === product.id)) {
        const updatedProductIDs = state.products.filter(
          (product) => product.id != action.payload.id
        )
        state.products = [...updatedProductIDs]
      }
    },
    setError(state, action: PayloadAction<Error>) {
      state.error = action.payload
      state.loading = false
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
  },
})

export const {
  setProducts,
  addProduct,
  deleteProduct,
  setError,
  setLoading,
} = favoritesSlice.actions
