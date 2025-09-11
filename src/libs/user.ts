import { ACCOUNT_ID } from "@env"
import { apiGet } from "./api"

export const getUserDetail = async () => {
  const res = await apiGet(`account/${ACCOUNT_ID}`)
  return res
}