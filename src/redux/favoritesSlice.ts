import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductRefState } from "../interfaces/interfaces";
import { addProductIDHelper, deleteProductIDHelper, setErrorHelper, setLoadingHelper, setProductIDsHelper } from "../helpers/stateHelpers";

const initialState: IProductRefState = {
    productIDs: [],
    loading: false,
    error: null,
}

export const favoritesSlice = createSlice({
    name: "favorites",
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

export const { setProductIDs, addProductID, deleteProductID, setError, setLoading } = favoritesSlice.actions