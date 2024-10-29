import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./productsSlice";
import { filterSlice } from "./filterSlice";
import { cartSlice } from "./cartSlice";
import { favoritesSlice } from "./favoritesSlice";
import { authSlice } from "./authSlice";

export const store = configureStore({
    reducer: {
        [productsSlice.name]: productsSlice.reducer,
        [filterSlice.name]: filterSlice.reducer,
        [cartSlice.name]: cartSlice.reducer,
        [favoritesSlice.name]: favoritesSlice.reducer,
        [authSlice.name]: authSlice.reducer
    },
})

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch