/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { IProduct } from '../types/interfaces'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '../redux'
import ProductCard from '../components/ProductCard'


const ProductPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const productID = searchParams.get("id")
  const parsedID = productID ? parseInt(productID) : undefined
  const product = useSelector((state: AppState) => state.products.products.find((p) => p.id === parsedID))
  return (
    <div>
      {product && <ProductCard {...product}/>}
    </div>
  )
}

export default ProductPage