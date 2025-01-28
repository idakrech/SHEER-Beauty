export function getFriendlyMessage(shippoMessage: string): string {
    const patterns: { regex: RegExp; friendlyMessage: string }[] = [
      {
        regex: /address\.street1 can not be empty/i,
        friendlyMessage: "The address could not be verified. Please provide the street name.",
      },
      {
        regex: /The address could not be verified at least up to the postal code level|The submitted postal code was not found in the Geocode database/i,
        friendlyMessage: "The address could not be verified. Please check the postal code.",
      },
      {
        regex: /The postal code was added or changed/i,
        friendlyMessage: "The postal code has been modified in address verification. Please make sure it's updated correctly.",
      },
      {
        regex: /The administrative area \(state or province\) was added or changed/i,
        friendlyMessage: "The state or province has been added or updated. Please make sure it's updated correctly.",
      },
      {
        regex: /The address has been partially verified to the City Level, which is not the highest level possible/i,
        friendlyMessage: "The address could only be verified to the city level. Please provide correct street information.",
      }
      
    ]
  
    for (const { regex, friendlyMessage } of patterns) {
      if (regex.test(shippoMessage)) {
        return friendlyMessage
      }
    }
  
    return "An error occured. Please make sure you have provided all the necessary address information. If you have done it and the error still occurs, plase try again later"
  }
  
  