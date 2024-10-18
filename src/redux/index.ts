import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./productsSlice";
import { filterSlice } from "./filterSlice";
import { cartSlice } from "./cartSlice";

export const store = configureStore({
    reducer: {
        [productsSlice.name]: productsSlice.reducer,
        [filterSlice.name]: filterSlice.reducer,
        [cartSlice.name]: cartSlice.reducer
    },
})

export type AppState = ReturnType<typeof store.getState>;