import { useEffect, useState } from "react";
import { FetchProductParams, Product } from "../types/interfaces";
import { fetchProducts } from "../services/apiService";

function useFetchProducts(params: FetchProductParams) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            setError(null)

            try {
                const data = await fetchProducts(params)
                setProducts(data)
            } catch (error) {
                setError(error instanceof Error ? error : new Error('Unknown error'))
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [params])

    return { products, loading, error }
}

export default useFetchProducts