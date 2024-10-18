import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./productsSlice";
import { filterSlice } from "./filterSlice";
import { cartSlice } from "./cartSlice";
import { favoritesSlice } from "./favoritesSlice";

export const store = configureStore({
    reducer: {
        [productsSlice.name]: productsSlice.reducer,
        [filterSlice.name]: filterSlice.reducer,
        [cartSlice.name]: cartSlice.reducer,
        [favoritesSlice.name]: favoritesSlice.reducer
    },
})

export type AppState = ReturnType<typeof store.getState>;