import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IFavoritesState {
  productIDs: number[]
  loading: boolean
  error: Error | null
}

const initialState: IFavoritesState = {
  productIDs: [],
  loading: false,
  error: null,
}

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    //for products fetched from user data db
    setProductIDs(state, action: PayloadAction<number[]>) {
      if (action.payload.length === 0) {
        state.productIDs = []
      } else if (state.productIDs.length > 0) {
        const updatedIDs = state.productIDs.filter(
          (id) => !action.payload.some((num) => num === id)
        )
        state.productIDs = [...updatedIDs, ...action.payload]
      } else {
        state.productIDs = action.payload
      }
      state.loading = false
      state.error = null
    },
    addProductID(state, action: PayloadAction<number>) {
      if (!state.productIDs.some((id) => action.payload === id)) {
        state.productIDs = [...state.productIDs, action.payload]
      }
    },
    deleteProductID(state, action: PayloadAction<number>) {
      if (state.productIDs.some((id) => action.payload === id)) {
        const updatedProductIDs = state.productIDs.filter(
          (id) => id != action.payload
        )
        state.productIDs = [...updatedProductIDs]
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
  setProductIDs,
  addProductID,
  deleteProductID,
  setError,
  setLoading,
} = favoritesSlice.actions
