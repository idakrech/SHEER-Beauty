import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ITransactionState {
    id: string | null
    estimatedTime: string | null
}

const initialState: ITransactionState = {
    id: null,
    estimatedTime: null
}

export const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        setId(state, action: PayloadAction<string>) {
            state.id = action.payload
        },
        setEstimatedTime(state, action: PayloadAction<string>) {
            state.estimatedTime = action.payload
        },
        resetTransaction(state) {
            state.id = null
            state.estimatedTime = null
        }
    }
})

export const {setId, setEstimatedTime, resetTransaction} = transactionSlice.actions