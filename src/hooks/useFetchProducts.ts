import { useEffect } from "react";
import { IFetchProductParams } from "../types/interfaces";
import APIService from "../services/APIService";
import { setError, setLoading, setProducts } from "../redux/productsSlice";
import { useDispatch } from "react-redux";

function useFetchProducts(params: IFetchProductParams[]) {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async() => {
            dispatch(setLoading(true))

            try {
                params.forEach(async (p) => {
                    const data = await APIService.fetchProducts(p)
                    dispatch(setProducts(data))
                })
                
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