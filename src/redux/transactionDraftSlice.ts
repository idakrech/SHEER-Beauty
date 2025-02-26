import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAddress } from "../interfaces/interfaces"

interface ITransactionDraftState {
  delivery: {
    address: IAddress | null
    correctedAddress: IAddress | null
    service: string | null
    provider: string | null
    rate: number | null
  }
  payment: {
    method: "card" | "applePay/googlePay" | undefined
    totalSum: number | null
  }
}

const initialState: ITransactionDraftState = {
  delivery: {
    address: null,
    correctedAddress: null,
    service: null,
    provider: null,
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
    setCorrectedAddress(state, action: PayloadAction<IAddress>) {
      state.delivery.correctedAddress = action.payload
    },
    setDeliveryMethod(state, action: PayloadAction<{service: string, provider: string, rate: number}>) {
      state.delivery.service = action.payload.service
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
  setAddress, setCorrectedAddress, setDeliveryMethod, setTotalSum, setPaymentMethod
} = transactionDraftSlice.actions
