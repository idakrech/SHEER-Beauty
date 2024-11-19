import zxcvbn from "zxcvbn"

export const checkPasswordStrength = (password: string) => {
  const result = zxcvbn(password)
  return result.score
}
