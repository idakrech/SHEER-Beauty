/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../redux'
import ProductGrid from '../components/ProductGrid'
import { useLocation, useParams } from 'react-router-dom'



const CategoryPage = () => {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    
    // when opened from grid @ Home
    const gridID = searchParams.get('gridID')
    const filters = useSelector((state: AppState) => state.filters)
    const products = useSelector((state: AppState) => state.products.products)
    const grid = filters.find((grid) => grid.gridID === gridID)
    const filteredProducts = products.filter((product) => grid?.productIDs.includes(product.id))

  return (
    <ProductGrid products={filteredProducts} isExpanded={true} />
  )
}

export default CategoryPage