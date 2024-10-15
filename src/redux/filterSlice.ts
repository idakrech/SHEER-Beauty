/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFetchProductParams } from "../types/interfaces";

export interface IGridFilter {
  gridID: string;
  title: string;
  fetchParams: IFetchProductParams;
  productIDs: number[];
  createdAt?: string; //necessary for new arrivals section
}

export type IFilterState = IGridFilter[];

export const initialState: IFilterState = [
  {
    gridID: "grid1",
    title: "Vegan products",
    fetchParams: { product_type: "eyeshadow", product_tags: ["Vegan"] },
    productIDs: [],
  },
  {
    gridID: "grid2",
    title: "Maybelline mascaras",
    fetchParams: { product_type: "Mascara", brand: "Maybelline" },
    createdAt: "5/2/2014",
    productIDs: [],
  },
  {
    gridID: "grid3",
    title: "Highest rated Nyx products",
    fetchParams: { rating_greater_than: 4, brand: "nyx" },
    productIDs: [],
  },
];

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setProductIDs(
      state,
      action: PayloadAction<{ gridID: string; productIDs: number[] }>
    ) {
      const { gridID, productIDs } = action.payload;
      const grid = state.find((g) => g.gridID === gridID);
      if (grid) {
        grid.productIDs = productIDs;
      }
    }
  }
})

export const { setProductIDs } = filterSlice.actions
