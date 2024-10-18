/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IProductRefState } from "../interfaces/interfaces"
import { 
  setProductIDsHelper, 
  addProductIDHelper, 
  deleteProductIDHelper, 
  setErrorHelper, 
  setLoadingHelper 
} from "../helpers/stateHelpers"

const initialState: IProductRefState = {
  productIDs: [],
  loading: false,
  error: null,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProductIDs(state, action: PayloadAction<number[]>) {
      setProductIDsHelper(state, action)
    },
    addProductID(state, action: PayloadAction<number>) {
       addProductIDHelper(state, action)
    },
    deleteProductID(state, action: PayloadAction<number>) {
      deleteProductIDHelper(state, action)
    },
    setError(state, action: PayloadAction<Error>) {
        setErrorHelper(state, action)
    },
    setLoading(state, action: PayloadAction<boolean>) {
        setLoadingHelper(state, action)
    }
  }
})

export const { setProductIDs, addProductID, deleteProductID, setError, setLoading } = cartSlice.actions
