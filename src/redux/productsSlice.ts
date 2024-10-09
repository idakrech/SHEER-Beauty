import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../types/interfaces";

export interface ProductsState {
    products: IProduct[],
    loading: boolean,
    error: Error | null
}

export const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null
}
export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<IProduct[]>) {
            state.products = action.payload
            state.loading = false
            state.error = null
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

export const {setProducts, setError, setLoading } = productsSlice.actions