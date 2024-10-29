/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react"
import {
  loginWithEmail,
  logOut,
  registerWithEmail,
} from "../services/authService"

const AuthForm = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isRegister, setIsRegister] = useState<boolean>(false)

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
      console.log("User logged out")
    } catch (error) {
      alert(`An error occured: ${error}`)
    }
  }

  return (
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
      <button onClick={() => handleLogout()}>Log out</button>

    {/* to be implemented later with redux - a variable 'isLoggedIn' is needed first to conditionally display this button*/}
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  )
}

export default AuthForm
