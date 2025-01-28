import { User } from "firebase/auth"
import { IUser } from "../interfaces/interfaces"

export const transformFirebaseUser = (user: User | null): IUser | null => {
    if (!user) return null
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }
  }