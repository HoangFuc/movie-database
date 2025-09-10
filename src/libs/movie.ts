import { API_BASE_URL, apiGet } from "./api"

export const getListMovie = async (category: string) => {
  const res = await apiGet(`${API_BASE_URL}/movie/${category}`)
}