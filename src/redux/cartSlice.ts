/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ICartState {
  productIDs: number[]
  loading: boolean
  error: Error | null
}

export const initialState: ICartState = {
  productIDs: [],
  loading: false,
  error: null,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProductIDs(state, action: PayloadAction<number[]>) {
      if (state.productIDs.length > 0) {
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
    setError(state, action: PayloadAction<Error>) {
        state.error = action.payload
        state.loading = false
    },
    setLoading(state, action: PayloadAction<boolean>) {
        state.loading = action.payload
    }
  }
})

export const { setProductIDs, addProductID, setError, setLoading } = cartSlice.actions
