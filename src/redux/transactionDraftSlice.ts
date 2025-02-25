import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAddress } from "../interfaces/interfaces"

interface ITransactionDraftState {
  delivery: {
    address: IAddress | undefined
    provider: string | undefined
    rate: number | null
  }
  payment: {
    method: "card" | "applePay/googlePay" | undefined
    totalSum: number | null
  }
}

const initialState: ITransactionDraftState = {
  delivery: {
    address: undefined,
    provider: undefined,
    rate: null
  },
  payment: {
    method: undefined,
    totalSum: null
  }
}

export const transactionDraftSlice = createSlice({
  name: "transactionDraft",
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<IAddress>) {
      state.delivery.address = action.payload
    },
    setDelivery(state, action: PayloadAction<{provider: string, rate: number}>){
      state.delivery.provider = action.payload.provider
      state.delivery.rate = action.payload.rate
    },
    setTotalSum(state, action: PayloadAction<number>) {
      state.payment.totalSum = action.payload
    },
    setPaymentMethod(state, action: PayloadAction<"card" | "applePay/googlePay">) {
      state.payment.method = action.payload
    }
  }
})

export const {
  setAddress, setDelivery, setTotalSum, setPaymentMethod
} = transactionDraftSlice.actions
