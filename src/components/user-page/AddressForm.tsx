import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AppState } from "../../redux"
import { IAddress } from "../../interfaces/interfaces"
import { userDataService } from "../../services/userDataService"
import { checkIfAddressComplete } from "../../helpers/checkAddressCompletion"

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
    onAddressChange?.(updatedAddress, true)
    onAddressCompletion?.(checkIfAddressComplete(updatedAddress))
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

    onAddressCompletion?.(checkIfAddressComplete(addressValues))
    onAddressChange?.(addressValues, false)
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
