import { userDataService } from "../services/userDataService"
import { ITransaction, IUserData } from "../interfaces/interfaces"
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AppState } from "../redux"

export function useUserData() {
  const userId = useSelector((state: AppState) => state.auth.user?.uid)
  const [userDataFromDb, setUserDataFromDb] = useState<IUserData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [transactionsLoading, setTransactionsLoading] = useState<boolean>(false)

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
        setError("A problem has occurred when loading the address")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [userId])

  const fetchTransactions = useCallback(async () => {
    if (!userId) return
    try {
      const fetchedTransactions = await userDataService.getUserTransactions(userId)
      setTransactions(fetchedTransactions)
    } catch (error) {
      console.error("Failed to fetch transactions from db", error)
    } finally {
      setTransactionsLoading(false)
    }
    
  }, [userId])

  return { userDataFromDb, loading, error, transactions, transactionsLoading, fetchTransactions }
}
