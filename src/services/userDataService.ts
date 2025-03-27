import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import { db } from "../config/firebaseConfig"
import {
  IAddress,
  IProduct,
  ITransaction,
  IUserData,
} from "../interfaces/interfaces"

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
    cartProduct: { product: IProduct; quantity: number; selectedColor?: string }
  ) {
    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)
      const userData = userDoc.data()
      const currentCart = userData?.cart || []

      const existingProductIndex = currentCart.findIndex(
        (existingProduct: {
          product: IProduct
          quantity: number
          selectedColor?: string
        }) =>
          existingProduct.product.id === cartProduct.product.id &&
          existingProduct.selectedColor === cartProduct.selectedColor
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

  async decrementProductQuantity(
    userId: string,
    product: IProduct,
    selectedColor?: string
  ) {
    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)
      const userData = userDoc.data()
      const currentCart = userData?.cart || []

      const existingProductIndex = currentCart.findIndex(
        (cartItem: {
          product: IProduct
          quantity: number
          selectedColor?: string
        }) =>
          cartItem.product.id === product.id &&
          cartItem.selectedColor === selectedColor
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

  async removeFromCart(
    userId: string,
    product: IProduct,
    selectedColor?: string
  ) {
    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)
      const userData = userDoc.data()
      const currentCart = userData?.cart || []
      const updatedCart = currentCart.filter(
        (cartItem: { product: IProduct; selectedColor?: string }) =>
          !(
            cartItem.product.id === product.id &&
            cartItem.selectedColor === selectedColor
          )
      )

      await updateDoc(userRef, { cart: updatedCart })
    } catch (error) {
      console.error("Error removing product from cart in db", error)
      throw error
    }
  },

  async addFavorite(userId: string, favorite: IProduct) {
    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)
      const userData = userDoc.data()
      const currentFavs = userData?.favorites || []

      if (!currentFavs.includes((fav: IProduct) => fav.id === favorite.id)) {
        await updateDoc(userRef, { favorites: arrayUnion(favorite) })
      }
    } catch (error) {
      console.error("Error adding to favorites in db", error)
      throw error
    }
  },

  async removeFavorite(userId: string, favorite: IProduct) {
    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)
      const userData = userDoc.data()
      const currentFavs = userData?.favorites || []

      if (currentFavs.some((fav: IProduct) => fav.id === favorite.id)) {
        await updateDoc(userRef, {
          favorites: currentFavs.filter(
            (currentFav: IProduct) => currentFav.id !== favorite.id
          ),
        })
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

  async addTransaction(
    userId: string,
    transaction: ITransaction,
    transactionId: string
  ) {
    try {
      const transactionRef = doc(db, "transactions", transactionId)
      await setDoc(transactionRef, {
        ...transaction,
        id: transactionId,
        userId,
        createdAt: Timestamp.now(),
      })

      const userRef = doc(db, "users", userId)
      await updateDoc(userRef, {
        transactionIDs: arrayUnion(transactionId),
      })

      console.log("Transaction saved successfully in db")
    } catch (error) {
      console.error("Error adding transaction to db", error)
      throw error
    }
  },

  async clearCart(userId: string) {
    try {
      const userRef = doc(db, "users", userId)
      await updateDoc(userRef, {
        cart: [],
      })
      console.log("Cart cleared successfully in db")
    } catch (error) {
      console.error("Error clearing cart in db", error)
      throw error
    }
  },

  async getUserTransactions(userId: string) {
    try {
      const transactionsRef = collection(db, "transactions")
      const q = query(transactionsRef, where("userId", "==", userId))
      const querySnapshot = await getDocs(q)

      const transactions: ITransaction[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as ITransaction
        return {
          ...data,
          id: data.id || doc.id,
        }
      })
      
      return transactions
    } catch (error) {
      console.error("Error fetching user transactions", error)
      throw error
    }
  },
}
