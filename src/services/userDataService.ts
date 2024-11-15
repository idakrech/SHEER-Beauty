import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
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

  async addToCart(
    userId: string,
    cartProduct: { id: number; quantity: number }
  ) {
    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)
      const userData = userDoc.data()
      const currentCart = userData?.cart || []
  
      const existingProductIndex = currentCart.findIndex(
        (product: { id: number, quantity: number }) => product.id === cartProduct.id
      )
  
      if (existingProductIndex !== -1) {
        currentCart[existingProductIndex].quantity += cartProduct.quantity
      } else {
        currentCart.push(cartProduct)
      }
  
      await updateDoc(userRef, { cart: currentCart })
    } catch (error) {
      console.error("Error adding to cart in db", error)
      throw error
    }
  },

  async decrementProductQuantity(userId: string, productId: number) {
    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)
      const userData = userDoc.data()
      const currentCart = userData?.cart || []
  
      const existingProductIndex = currentCart.findIndex(
        (product: { productId: number, quantity: number }) => product.productId === productId
      )
  
      if (existingProductIndex !== -1) {
        const updatedCart = [...currentCart]
        const existingProduct = updatedCart[existingProductIndex]

        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1
        } else {
          updatedCart.splice(existingProductIndex, 1)
        }
        await updateDoc(userRef, { cart: updatedCart })
      } 

    } catch (error) {
      console.error("Error decrementing product quantity in cart in db", error)
      throw error
    }
  },
  async removeFromCart(userId: string, id: number) {
    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)
      const userData = userDoc.data()
      const currentCart = userData?.cart || []
  
      const updatedCart = currentCart.filter((product: { id: number }) => product.id !== id)
      
      await updateDoc(userRef, { cart: updatedCart })
    } catch (error) {
      console.error("Error removing product from cart in db", error)
      throw error
    }
  },

  async addFavorite(userId: string, favoriteId: number) {
    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)
      const userData = userDoc.data()
      const currentFavs = userData?.favorites || []

      if (!currentFavs.includes(favoriteId)) {
        await updateDoc(userRef, { favorites: arrayUnion(favoriteId) })
      }
    } catch (error) {
      console.error("Error adding to favorites in db", error)
      throw error
    }
  },

  async removeFavorite(userId: string, favoriteId: number) {
    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)
      const userData = userDoc.data()
      const currentFavs = userData?.favorites || []
  
      if (currentFavs.includes(favoriteId)) {
        await updateDoc(userRef, { favorites: currentFavs.filter((id: number) => id !== favoriteId) })
      }
    } catch (error) {
      console.error("Error removing from favorites in db", error)
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
