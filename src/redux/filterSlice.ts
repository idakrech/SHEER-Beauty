import { createSlice} from "@reduxjs/toolkit";
import { IFetchProductParams } from "../types/interfaces";

export interface IGridFilter {
    gridID: string,
    title: string,
    fetchParams: IFetchProductParams,
    createdAt?: string //necessary for new arrivals section
  }
  
export type IFilterState = IGridFilter[]

export const initialState: IFilterState = [
    { gridID: "grid1", title: "Vegan products", fetchParams: { product_type: "eyeshadow", product_tags: ["Vegan"]}}, 
    { gridID: "grid2", title: "Maybelline mascaras", fetchParams: {product_type: "Mascara", brand: "Maybelline"}, createdAt: "5/2/2015"},
    { gridID: "grid3", title: "Highest rated Nyx products", fetchParams: {rating_greater_than: 4, brand: "nyx"}}
]

export const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {}
})
