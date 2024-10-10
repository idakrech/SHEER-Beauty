import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../types/interfaces";

export interface ProductsState {
  products: IProduct[];
  loading: boolean;
  error: Error | null;
}

export const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<IProduct[]>) {
      if (state.products.length > 0) {
        const updatedProducts = state.products.filter(
          (product) => !action.payload.some((p) => p.id === product.id)
        );
        state.products = [...updatedProducts, ...action.payload];
      } else {
        state.products = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    setError(state, action: PayloadAction<Error>) {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setProducts, setError, setLoading } = productsSlice.actions;
