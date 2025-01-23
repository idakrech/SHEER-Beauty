import { userDataService } from "../services/userDataService"
import { IUserData } from "../interfaces/interfaces"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AppState } from "../redux"

export function useUserData() {
  const userId = useSelector((state: AppState) => state.auth.user?.uid)
  const [userDataFromDb, setUserDataFromDb] = useState<IUserData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setLoading(false)
        return
      }
      try {
        const data = await userDataService.getUserData(userId)
        setUserDataFromDb(data as IUserData)
      } catch {
        console.log("Failed to fetch user data")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [userId])

  return { userDataFromDb, loading }
}
