import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { IAddress, IUserData } from "../interfaces/interfaces"

export const userDataService = {
  async initializeUserData(userData: IUserData) {
    try {
      const userRef = doc(db, "users", userData.userID)
      await setDoc(userRef, userData, { merge: true })
    } catch (error) {
      console.error("Error initializing user data", error)
      throw error
    }
  },

  async getUserData(userId: string) {
    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)
      return userDoc.exists() ? userDoc.data() : null
    } catch (error) {
      console.error("Error retrieving user data", error)
      throw error
    }
  },

  async updateUserCart(
    userId: string,
    cartProduct: { productId: number; quantity: number }
  ) {
    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)
      const userData = userDoc.data()
      const currentCart = userData?.cart || []
  
      const existingProductIndex = currentCart.findIndex(
        (product: { productId: number; quantity: number }) => product.productId === cartProduct.productId
      )
  
      if (existingProductIndex !== -1) {
        currentCart[existingProductIndex].quantity += cartProduct.quantity
      } else {
        currentCart.push(cartProduct)
      }
  
      await updateDoc(userRef, { cart: currentCart })
    } catch (error) {
      console.error("Error updating user cart", error)
      throw error
    }
  },

  async updateUserFavorites(userId: string, favorites: number[]) {
    try {
      const userRef = doc(db, "users", userId)
      await updateDoc(userRef, { favorites })
    } catch (error) {
      console.error("Wrror updating user favorites", error)
      throw error
    }
  },

  async updateUserAddress(userId: string, address: IAddress) {
    try {
      const userRef = doc(db, "users", userId)
      await updateDoc(userRef, { address })
    } catch (error) {
      console.error("Error updating user address", error)
      throw error
    }
  },
}
