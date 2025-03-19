/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react"
import {
  loginWithEmail,
  logOut,
  registerWithEmail,
} from "../../services/authService"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../../redux"
import { setProducts as setCartProducts } from "../../redux/cartSlice"
import { setProducts as setFavProducts } from "../../redux/favoritesSlice"
import { checkPasswordStrength } from "../../helpers/passwordCheck"

const AuthForm = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [passwordStrength, setPasswordStrength] = useState<number | null>(null)
  const user = useSelector((state: AppState) => state.auth.user)
  const userFirstName = user?.displayName
  const dispatch = useDispatch<AppDispatch>()
  const [error, setError] = useState<string>("")

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    setPassword(password)
    if (isRegister) {
      const score = checkPasswordStrength(password)
      setPasswordStrength(score)
    }
  }

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
      if (isRegister) {
        setError("We're sorry, an error occured. Please try again later 🫶")
      } else {
        setError("Wrong e-mail or password")
      }
    }
  }

  const handleLogout = async () => {
    try {
      await logOut()
      dispatch(setFavProducts([]))
      dispatch(setCartProducts([]))
      console.log("User logged out")
    } catch (error) {
      setError("Sorry, an error occured")
    }
  }

  return (
    <div className="h-full w-full">
      {!user && (
        <div className="w-full mb-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-1 bg-primary border rounded-md border-zinc-300"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="p-1 bg-primary border rounded-md border-zinc-300"
              required
            />
            {isRegister && passwordStrength !== null && (
              <div>
                <p>
                  Strength:{" "}
                  {
                    ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"][
                      passwordStrength
                    ]
                  }
                </p>
              </div>
            )}
            <button
              type="submit"
              className="w-full border border-zinc-300 text-center p-1 mb-1 mt-2 rounded-md bg-accent hover:bg-dark duration-200 ease-in"
            >
              {isRegister ? "Register" : "Login"}
            </button>
          </form>
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="w-full border border-zinc-300 text-center p-1 rounded-md hover:bg-accent/50 duration-200 ease-in"
          >
            {isRegister ? "Switch to Login" : "Switch to Register"}
          </button>
          {error && <p className="text-sm mt-3 text-rose-400 text-center">{error}</p>}
        </div>
      )}

      {user && (
        <div>
          {userFirstName && <h3>Welcome {userFirstName}!</h3>}
          <button
            onClick={() => handleLogout()}
            className="w-full border border-zinc-300 text-center px-3 mt-2 rounded-md hover:bg-accent/50 duration-200 ease-in"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default AuthForm
