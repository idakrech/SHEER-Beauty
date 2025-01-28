import { setLoading, setUser } from "../redux/authSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppDispatch } from "../redux";
import { app } from "../firebaseConfig";
import { transformFirebaseUser } from "./transformUser";

export const listenToAuth = () => (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    const auth = getAuth(app)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(setUser(transformFirebaseUser(user)))
        } else {
            dispatch(setUser(null))
        }
        dispatch(setLoading(false))
    })
}