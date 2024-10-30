import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { app }  from "../firebaseConfig"

/* eslint-disable @typescript-eslint/no-unused-vars */

const auth = getAuth(app)

export const registerWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        return userCredential.user
    } catch (error) {
        console.log("Error while registering user", error)
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