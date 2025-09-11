import { apiGet, apiPost } from "./api"
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

export const removeFromWatchList = async (movieId: number) => {
  const res = await apiPost(`account/${ACCOUNT_ID}/watchlist`,
    {
      media_type: 'movie',
      media_id: movieId,
      watchlist: false
    }
  )

  return res
}

export const getWatchListMovie = async () => {
  const res = await apiGet(`account/${ACCOUNT_ID}/watchlist/movies`)
  return res?.results
}