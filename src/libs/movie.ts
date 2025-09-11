import { apiGet } from "./api"
const language = 'en-US'

export const getMovieDetail = async (movieID: number) => {
  const res = await apiGet(`movie/${movieID}?language=${language}`)
  return res
}

export const getCreditsOfMovie = async (movieID: number) => {
  const res = await apiGet(`movie/${movieID}/credits?language=${language}`)
  return res
}

export const getRecommendationLists = async (movieID: number) => {
  const res = await apiGet(`movie/${movieID}/recommendations?language=${language}&page=1`)
  return res?.results
}