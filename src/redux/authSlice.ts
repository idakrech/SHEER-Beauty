import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "../interfaces/interfaces"

interface IAuthState {
  user: IUser | null
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
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    setUserFirstName(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.displayName = action.payload
      }
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

export const { setUser, setUserFirstName, setLoading, setError, logout } =
  authSlice.actions
