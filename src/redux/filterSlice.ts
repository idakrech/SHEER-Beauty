import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IFilterState {
  type: string
  category: string
  selectedBrands: string[]
  selectedTags: string[]
  selectedColors: string[]
  priceRange: { min: number; max: number }
}

const initialState: IFilterState = {
  type: "",
  category: "",
  selectedBrands: [],
  selectedTags: [],
  selectedColors: [],
  priceRange: { min: 0, max: Infinity },
}

export const filterSlice = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload
    },
    toggleCategory(state, action: PayloadAction<string>) {
      if (state.category === action.payload) {
        state.category = ""
      } else {
        state.category = action.payload
      }
    },
    toggleBrand: (state, action: PayloadAction<string>) => {
      const index = state.selectedBrands.indexOf(action.payload)
      if (index > -1) {
        state.selectedBrands.splice(index, 1)
      } else {
        state.selectedBrands.push(action.payload)
      }
    },
    toggleTag: (state, action: PayloadAction<string>) => {
      const index = state.selectedTags.indexOf(action.payload)
      if (index > -1) {
        state.selectedTags.splice(index, 1)
      } else {
        state.selectedTags.push(action.payload)
      }
    },
    toggleColor: (state, action: PayloadAction<string>) => {
      const index = state.selectedColors.indexOf(action.payload)
      if (index > -1) {
        state.selectedColors.splice(index, 1)
      } else {
        state.selectedColors.push(action.payload)
      }
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.priceRange = action.payload
    },
    resetFilters: (state) => {
      Object.assign(state, initialState)
    },
  },
})

export const {
  setType,
  toggleCategory,
  toggleBrand,
  toggleTag,
  toggleColor,
  setPriceRange,
  resetFilters,
} = filterSlice.actions
