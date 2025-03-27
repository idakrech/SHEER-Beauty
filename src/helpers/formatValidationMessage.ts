import { AddressValidationResultsMessage } from "shippo";

export function getSummaryMessage(shippoMessages: AddressValidationResultsMessage[]): string {
  const patterns: { regex: RegExp; category: string }[] = [
    {
      regex: /address\.street1 can not be empty|length should be more than 2/i,
      category: "missingFields",
    },
    {
      regex:
        /postal code.*not found|address could not be verified.*postal code/i,
      category: "missingFields",
    },
    {
      regex: /The postal code was added or changed/i,
      category: "adjustments",
    },
    {
      regex:
        /administrative area.*added or changed|locality.*added or changed/i,
      category: "adjustments",
    },
    {
      regex: /address could not be verified/i,
      category: "generalError",
    },
  ]

  if (!shippoMessages || shippoMessages.length === 0) return ""

  const positiveCodes = new Set(["premises_full", "geocoded_rooftop"])
  const categories = new Set<string>()
  const messageTexts = shippoMessages.map((msg) => msg.text).filter((text) => !!text)
  
  const allPositive = shippoMessages.every((msg) => msg.code && positiveCodes.has(msg.code))

  if (allPositive) {
    return ""
  }
  
  for (const message of messageTexts) {
    for (const { regex, category } of patterns) {
      if (message && regex.test(message)) {
        categories.add(category)
      }
    }
  }

  const summaryMessages: Record<string, string> = {
    missingFields:
      "Please ensure that all required fields are filled out correctly, including the street, postal code, city, and country.",
    adjustments:
      "Some address fields were updated during verification. Please review the postal code, state/province, and locality for accuracy.",
    partialVerification:
      "The address could only be verified partially. Ensure that the street and postal code are correct.",
    generalError:
      "The address could not be verified. Please check all fields and try again.",
  }

  const summary: string[] = []

  for (const category of categories) {
    if (summaryMessages[category]) {
      summary.push(summaryMessages[category])
    }
  }

  return summary.length > 0
    ? summary.join(" ")
    : "An error occurred. Please make sure you have provided all the necessary address information. [validation return]"

}
