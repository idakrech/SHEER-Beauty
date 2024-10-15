import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./productsSlice";
import { filterSlice } from "./filterSlice";

export const store = configureStore({
    reducer: {
        [productsSlice.name]: productsSlice.reducer,
        [filterSlice.name]: filterSlice.reducer
    },
})

export type AppState = ReturnType<typeof store.getState>;