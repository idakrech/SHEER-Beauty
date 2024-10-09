import { useEffect } from "react";
import { FetchProductParams } from "../types/interfaces";
import APIService from "../services/APIService";
import { setError, setLoading, setProducts } from "../redux/productsSlice";
import { useDispatch } from "react-redux";

function useFetchProducts(params: FetchProductParams) {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async() => {
            dispatch(setLoading(true))

            try {
                const data = await APIService.fetchProducts(params)
                dispatch(setProducts(data))
            } catch (error) {
                dispatch(setError(error instanceof Error ? error : new Error('Unknown error')))
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])
}

export default useFetchProducts