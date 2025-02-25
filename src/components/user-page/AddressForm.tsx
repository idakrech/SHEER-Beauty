import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AppState } from "../../redux"
import { IAddress } from "../../interfaces/interfaces"
import { userDataService } from "../../services/userDataService"
import { countries } from "../../constants/countries"

const AddressForm = ({
  address,
  onSave,
}: {
  address?: IAddress
  onSave?: (address: IAddress) => void
}) => {
  const user = useSelector((state: AppState) => state.auth.user)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [addressValues, setAddressValues] = useState<IAddress>({
    name: "",
    street1: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    phone: "",
  })
  const [countryCode, setCountryCode] = useState<string>("")
  const [savingError, setSavingError] = useState<string>("")

  useEffect(() => {
    if (address) {
      setAddressValues(address)
    }
  }, [address])

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const updatedAddress = { ...addressValues, [e.target.name]: e.target.value }
    setAddressValues(updatedAddress)
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value
    setAddressValues({ ...addressValues, country: selectedCountry })

    const country = countries.find(
      (country) => country.value === selectedCountry
    )
    if (country) {
      setCountryCode(country.dialCode)
    }
  }

  const handlePhoneFocus = () => {
    if (!addressValues.phone) {
      setAddressValues({ ...addressValues, phone: countryCode })
    }
  }

  const handlePhoneBlur = () => {
    if (addressValues.phone === countryCode) {
      setAddressValues({ ...addressValues, phone: "" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (user) {
        await userDataService.updateUserAddress(user?.uid, addressValues)
        console.log("Address saved successfully")
      }
      onSave?.(addressValues)
      setIsEditing(false)
    } catch (error) {
      console.log("Error saving address", error)
      setSavingError("An error occured when saving the address")
    }
  }

  return (
    <div>
      {isEditing ? (
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
          <select
            name="country"
            value={addressValues.country}
            onChange={handleCountryChange}
            required
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          <input
            name="phone"
            type="text"
            placeholder={
              countryCode ? `${countryCode} Phone number` : "Phone number"
            }
            value={addressValues.phone}
            onFocus={handlePhoneFocus}
            onBlur={handlePhoneBlur}
            onChange={changeHandler}
            required
          />

          <button type="submit" className="border border-zinc-300 text-center text-zinc-700 px-3 mt-2 rounded-md hover:bg-accent/50 duration-200 ease-in">Save</button>
          {savingError && <p>{savingError}</p>}
        </form>
      ) : (
        <div>
          <p>
            <strong>{addressValues.name}</strong>
          </p>
          <p>
            {addressValues.street1}, {addressValues.city}, {addressValues.zip},{" "}
            {addressValues.state}
          </p>
          <p>{addressValues.country}</p>
          <p>{addressValues.phone}</p>
          <button onClick={() => setIsEditing(true)} className="border border-zinc-300 text-center text-zinc-700 px-3 mt-2 rounded-md hover:bg-accent/50 duration-200 ease-in">Edit</button>
        </div>
      )}
    </div>
  )
}

export default AddressForm
