import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AppState } from "../../redux"
import { IAddress } from "../../interfaces/interfaces"
import { userDataService } from "../../services/userDataService"

const AddressForm = ({
  address,
  onAddressChange,
  onAddressCompletion,
}: {
  address?: IAddress
  onAddressChange?: (address: IAddress, isEditing: boolean) => void
  onAddressCompletion?: (isComplete: boolean) => void
}) => {
  const user = useSelector((state: AppState) => state.auth.user)
  const [addressValues, setAddressValues] = useState<IAddress>({
    name: "",
    street1: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    phone: "",
  })

  useEffect(() => {
    if (address) {
      setAddressValues(address)
    }
  }, [address])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAddress = { ...addressValues, [e.target.name]: e.target.value }
    setAddressValues(updatedAddress)
    if (onAddressChange) {
      onAddressChange(updatedAddress, true)
    }

    const isComplete =
      !!updatedAddress.name &&
      !!updatedAddress.street1 &&
      !!updatedAddress.city &&
      !!updatedAddress.zip &&
      !!updatedAddress.country &&
      !!updatedAddress.phone
    
    if (onAddressCompletion) {
      onAddressCompletion(isComplete)
    }
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
      //TODO: useState error instead of alert
      alert("An error occured")
    }
    if (onAddressCompletion) {
      if (
        !!addressValues.name ||
        !!addressValues.street1 ||
        !!addressValues.city ||
        !!addressValues.zip ||
        !!addressValues.country ||
        !!addressValues.phone
      ) {
        onAddressCompletion(false)
      } else {
        onAddressCompletion(true)
      }
    }
    if (onAddressChange) {
      onAddressChange(addressValues, false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={addressValues.name}
          onChange={changeHandler}
          required
        />
        <input
          name="street1"
          type="text"
          placeholder="Street"
          value={addressValues.street1}
          onChange={changeHandler}
          required
        />
        <input
          name="city"
          type="text"
          placeholder="City"
          value={addressValues.city}
          onChange={changeHandler}
          required
        />
        <input
          name="zip"
          type="text"
          placeholder="Zip Code"
          value={addressValues.zip}
          onChange={changeHandler}
          required
        />
        <input
          name="state"
          type="text"
          placeholder="State/Provice"
          value={addressValues.state}
          onChange={changeHandler}
        />
        {/* TODO: country dropdown */}
        <input
          name="country"
          type="text"
          placeholder="Country"
          value={addressValues.country}
          onChange={changeHandler}
          required
        />
        {/* TODO: dropdown of country codes; generate placeholder based on country input above */}
        <input
          name="phone"
          type="number"
          placeholder="Phone number"
          value={addressValues.phone}
          onChange={changeHandler}
          required
        />
        {/* TODO: if it's checkout, then don't show save btn? */}
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default AddressForm
