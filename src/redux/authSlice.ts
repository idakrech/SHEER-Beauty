/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "firebase/auth"
import { logOut } from "../services/authService"

interface IAuthState {
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: IAuthState = {
  user: null,
  loading: false,
  error: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
      state.loading = false
    },
    logout(state) {
      state.user = null
      state.loading = false
      state.error = null
    },
  },
})

export const { setUser, setLoading, setError, logout } = authSlice.actions
