import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { IAddress } from "../interfaces/interfaces"

interface IUserData {
    userID: string
    email: string
    address?: IAddress
    favorites?: number[]
    cart?: {
        productId: number
        quantity: number
    }[]
}

export const userDataService = {

    async initializeUserData(userData: IUserData) {
        const userRef = doc(db, "users", userData.userID)
        await setDoc(userRef, userData, {merge: true})
    },

    async getUserData(userId: string) {
        const userRef = doc(db, "users", userId)
        const userDoc = await getDoc(userRef)
        return userDoc.exists() ? userDoc.data() : null
    },

    async updateUserCart(userId: string, cart: {productId: number, quantity: number}[]) {
        const userRef = doc(db, "users", userId)
        await updateDoc(userRef, { cart })
    },

    async updateUserFavorites(userId: string, favorites: number[]) {
        const userRef = doc(db, "users", userId)
        await updateDoc(userRef, { favorites })
    },
    
    async updateUserAddress(userId: string, address: IAddress) {
        const userRef = doc(db, "users", userId)
        await updateDoc(userRef, {address})
    }
}
