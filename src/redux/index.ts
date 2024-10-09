import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./productsSlice";

export const store = configureStore({
    reducer: {
        [productsSlice.name]: productsSlice.reducer
        // [cartSlice.name]: createSlice.reducer
    },
})

export type AppState = ReturnType<typeof store.getState>;