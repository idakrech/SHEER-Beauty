import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <p>Navbar</p>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="cart-page">Cart</NavLink></li>
        <li><NavLink to="user-page">Account</NavLink></li>
        </div>
  )
}

export default Navbar