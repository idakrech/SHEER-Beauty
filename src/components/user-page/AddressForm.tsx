import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AppState } from "../../redux"
import { IAddress } from "../../interfaces/interfaces"
import { userDataService } from "../../services/userDataService"

const AddressForm = () => {
  const user = useSelector((state: AppState) => state.auth.user)
  const [addressValues, setAddressValues] = useState<IAddress>({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    zipCode: "",
    country: "",
    phoneCountryCode: "",
    phoneNumber: null,
  })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userData = await userDataService.getUserData(user.uid)
          if (userData?.address) {
            setAddressValues(userData.address)
          }
        } catch (error) {
          console.error("Error fetching address data", error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValues({ ...addressValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (user) {
        await userDataService.updateUserAddress(user?.uid, addressValues)
        console.log("Address saved successfully")
      }
    } catch (error) {
      console.log("Error saving address", error)
      alert("An error occured")
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {user ? (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={addressValues.firstName}
              onChange={changeHandler}
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={addressValues.lastName}
              onChange={changeHandler}
            />
            <input
              name="street"
              type="text"
              placeholder="Street"
              value={addressValues.street}
              onChange={changeHandler}
            />
            <input
              name="city"
              type="text"
              placeholder="City"
              value={addressValues.city}
              onChange={changeHandler}
            />
            <input
              name="zipCode"
              type="text"
              placeholder="Zip Code"
              value={addressValues.zipCode}
              onChange={changeHandler}
            />
            <input
              name="country"
              type="text"
              placeholder="Country"
              value={addressValues.country}
              onChange={changeHandler}
            />
            {/* TODO: dropdown of country codes */}
            <input
              name="phoneCountryCode"
              type="text"
              placeholder="Country code"
              value={addressValues.phoneCountryCode}
              onChange={changeHandler}
            />
            <input
              name="phoneNumber"
              type="number"
              placeholder="Phone number"
              value={addressValues.phoneNumber ? addressValues.phoneNumber : ""}
              onChange={changeHandler}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      ) : (
        <h1>Register to create an account or log in</h1>
      )}
    </div>
  )
}

export default AddressForm
