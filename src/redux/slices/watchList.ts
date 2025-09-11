import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiGet } from "../../libs/api"
import _ from "lodash"
import { Alert } from "react-native"
import { RootState } from "../configStore"
import { ACCOUNT_ID } from "@env"
import { Movie } from "../../types"

type WatchListState = {
  watchListSave: Movie[]
  page: number
  loading: boolean
}

const initialState: WatchListState = {
  watchListSave: [],
  page: 1,
  loading: false
}

const ALPHA = "alpha"
const RATING = 'rating'
const RELEASE_DATE = 'release-date'

const watchListSlice = createSlice({
  name: 'watchList',
  initialState,
  reducers: {
    sortList(state, action) {
      const type = action.payload
      const lists = state.watchListSave
      if (_.isEmpty(lists)) return Alert.alert("Notify", "Missing watchlist to sort !")

      let sortLists: Movie[] = []

      switch (type) {
        case ALPHA: {
          sortLists = _.sortBy(lists, 'title')
          state.watchListSave = sortLists
          break
        }
        case RATING: {
          sortLists = _.sortBy(lists, 'vote_average').reverse()
          state.watchListSave = sortLists
          break
        }
        case RELEASE_DATE: {
          sortLists = _.sortBy(lists, 'release_date').reverse()
          state.watchListSave = sortLists
          break
        }
        default: {
          break
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWatchListMovies.fulfilled, (state, action) => {
        state.watchListSave = action.payload?.results || []
        state.loading = false
      })
      .addCase(getWatchListMovies.rejected, (state, action) => {
        state.loading = true
      })
      .addCase(getWatchListMovies.pending, (state) => {
        state.loading = true
      })
  }
})

export const getWatchListMovies = createAsyncThunk(
  'watchList/getWatchListMovies',
  async (data: any, thunkAPI) => {
    const page = (thunkAPI.getState() as RootState).watchList.page
    const language = "en-US"

    try {
      const res = await apiGet(`account/${ACCOUNT_ID}/watchlist/movies?language=${language}&page=${page}`)
      return res

    } catch (error) {
      console.log('Error get watchlist movies', error)
    }
  },
)

export const { sortList } = watchListSlice.actions
export default watchListSlice.reducer