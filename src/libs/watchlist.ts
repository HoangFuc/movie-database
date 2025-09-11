import { apiPost } from "./api"
import { ACCOUNT_ID } from "@env"

export const addToWatchList = async (movieId: number) => {
  const res = await apiPost(`account/${ACCOUNT_ID}/watchlist`,
    {
      media_type: 'movie',
      media_id: movieId,
      watchlist: true
    }
  )

  return res
}