/* eslint-disable @typescript-eslint/no-unused-vars */
import { setLoading, setUser } from "../redux/authSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppDispatch } from "../redux";
import { app } from "../firebaseConfig";

export const listenToAuth = () => (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    const auth = getAuth(app)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(setUser(user))
        } else {
            dispatch(setUser(null))
        }
        dispatch(setLoading(false))
    })
}