import { configureStore } from "@reduxjs/toolkit"
import { productsSlice } from "./productsSlice"
import { cartSlice } from "./cartSlice"
import { favoritesSlice } from "./favoritesSlice"
import { authSlice } from "./authSlice"
import { filterSlice } from "./filterSlice"
import { transactionDraftSlice } from "./transactionDraftSlice"
import { transactionSlice } from "./transactionSlice"

export const store = configureStore({
  reducer: {
    [productsSlice.name]: productsSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [favoritesSlice.name]: favoritesSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [filterSlice.name]: filterSlice.reducer,
    [transactionDraftSlice.name]: transactionDraftSlice.reducer,
    [transactionSlice.name]: transactionSlice.reducer
  },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
