/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react"
import {
  loginWithEmail,
  logOut,
  registerWithEmail,
} from "../services/authService"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../redux"
import { setProducts } from "../redux/cartSlice"
import { setProductIDs } from "../redux/favoritesSlice"

const AuthForm = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const user = useSelector((state: AppState) => state.auth.user)
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isRegister) {
        await registerWithEmail(email, password)
        console.log("User registered")
      } else {
        await loginWithEmail(email, password)
        console.log("User logged in")
      }
    } catch (error) {
      alert(`An error occured: ${error}`)
    }
  }

  const handleLogout = async () => {
    try {
      await logOut()
      dispatch(setProducts([]))
      dispatch(setProductIDs([]))
      console.log("User logged out")
    } catch (error) {
      alert(`An error occured: ${error}`)
    }
  }

  return (
    <div>
      {!user && (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">{isRegister ? "Register" : "Login"}</button>
          </form>
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Switch to Login" : "Switch to Register"}
          </button>
        </div>
      )}

      {user && (
        <div>
          {/* TODO: implement name from user address */}
          <h3>Welcome ABC!</h3> 
        <button onClick={() => handleLogout()}>Logout</button>
        </div>
        )}
    </div>
  )
}

export default AuthForm
