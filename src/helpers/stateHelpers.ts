/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction } from "@reduxjs/toolkit";
import { IProductRefState } from "../interfaces/interfaces";

export const setProductIDsHelper = (state: IProductRefState, action: PayloadAction<number[]>) => {
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
}

export const addProductIDHelper = (state: IProductRefState, action: PayloadAction<number>) => {
    if (!state.productIDs.some((id) => action.payload === id)) {
      state.productIDs = [...state.productIDs, action.payload]
    } 
}

export const deleteProductIDHelper = (state: IProductRefState, action: PayloadAction<number>) => {
    if (state.productIDs.some((id) => action.payload === id)) {
      const updatedProductIDs = state.productIDs.filter((id) => id != action.payload)
      state.productIDs = [...updatedProductIDs]
    }
}

export const setErrorHelper = (state: IProductRefState, action: PayloadAction<Error>) => {
    state.error = action.payload
    state.loading = false
}

export const setLoadingHelper = (state: IProductRefState, action: PayloadAction<boolean>) => {
    state.loading = action.payload
}