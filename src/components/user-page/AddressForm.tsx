import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AppState } from "../../redux"
import { IAddress } from "../../interfaces/interfaces"
import { userDataService } from "../../services/userDataService"

//TODO: replace my own address interface with Shippo interface
const AddressForm = ({address, onAddressChange}: {address?: IAddress, onAddressChange: (address: IAddress) => void}) => {
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

  useEffect(() => {
    if (address) {
      setAddressValues(address)
    }
  }, [address])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValues({ ...addressValues, [e.target.name]: e.target.value })
    onAddressChange({ ...addressValues, [e.target.name]: e.target.value })
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

  return (
    <div>
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
            {/* TODO: country dropdown */}
            <input
              name="country"
              type="text"
              placeholder="Country"
              value={addressValues.country}
              onChange={changeHandler}
            />
            {/* TODO: dropdown of country codes; generate placeholder based on country input above */}
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
            {/* TODO: if it's checkout, then don't show save btn? */}
            <button type="submit">Save</button>
          </form>
        </div>
    </div>
  )
}

export default AddressForm
