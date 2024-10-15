/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { IFetchProductParams, IProduct } from "../types/interfaces";
import APIService from "../services/APIService";
import { setError, setLoading, setProducts } from "../redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux";
import { setProductIDs } from "../redux/filterSlice";

function useFetchProducts(params: IFetchProductParams[]) {

    const dispatch = useDispatch()
    const filters = useSelector((state: AppState) => state.filters)

    useEffect(() => {
        const fetchData = async() => {
            dispatch(setLoading(true))

            try {
                params.forEach(async (p, index) => {
                    const data = await APIService.fetchProducts(p)
                    dispatch(setProducts(data))
                    const productIDs = data.map((product: IProduct) => product.id)
                    const gridID = filters[index].gridID
                    dispatch(setProductIDs({gridID, productIDs}))
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