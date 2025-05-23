import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { app }  from "../config/firebaseConfig"
import { userDataService } from "./userDataService"
import { IUserData } from "../interfaces/interfaces"

const auth = getAuth(app)

export const registerWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        if (user) {
            const userData: IUserData = {
                userID: user.uid,
                email: user.email || email,
                address: null,
                favorites: [],
                cart: [],
                transactionIDs: []
            }
            await userDataService.initializeUserData(userData)
        }
        return userCredential.user
    } catch (error) {
        console.error("Error while registering user", error)
        throw error
    }
}

export const loginWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return userCredential.user
    } catch (error) {
        console.error("Error while logging in user", error)
        throw error
    }
}

export const logOut = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.error("Error logging user out", error)
        throw error
    }
}