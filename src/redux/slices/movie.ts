import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiGet } from "../../libs/api"
import _ from "lodash"
import { Alert } from "react-native"
import { RootState } from "../configStore"
import { Movie } from "../../types"

type MovieState = {
  lists: Movie[]
  selectedCategory: string
  loading: boolean
  page: number,
  searchQuery: string
  filteredLists: Movie[]
  isSearching: boolean
}

const initialState: MovieState = {
  lists: [],
  selectedCategory: 'now_playing',
  loading: false,
  page: 1,
  searchQuery: '',
  filteredLists: [],
  isSearching: false,
}

const ALPHA = "alpha"
const RATING = 'rating'
const RELEASE_DATE = 'release-date'

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    sortListBy(state, action) {
      const type = action.payload
      const lists = state.lists
      if (_.isEmpty(lists)) return Alert.alert("Notify", "Missing list movie to sort !")

      let sortLists: Movie[] = []

      switch (type) {
        case ALPHA: {
          sortLists = _.sortBy(lists, 'title')
          state.lists = sortLists
          break
        }
        case RATING: {
          sortLists = _.sortBy(lists, 'vote_average').reverse()
          state.lists = sortLists
          break
        }
        case RELEASE_DATE: {
          sortLists = _.sortBy(lists, 'release_date').reverse()
          state.lists = sortLists
          break
        }
        default: {
          break
        }
      }
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload
    },
    searchMovies(state, action) {
      const query = action.payload.toLowerCase().trim()
      state.searchQuery = query

      if (query === '') {
        state.isSearching = false
        state.filteredLists = []
      } else {
        state.isSearching = true
        state.filteredLists = state.lists.filter(movie =>
          movie.title.toLowerCase().includes(query)
        )
      }
    },
    clearSearch(state) {
      state.searchQuery = ''
      state.filteredLists = []
      state.isSearching = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListMovieByCategory.fulfilled, (state, action) => {
        state.loading = false
        state.lists = action.payload?.results || []
        state.searchQuery = ''
        state.filteredLists = []
        state.isSearching = false
      })
      .addCase(getListMovieByCategory.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getListMovieByCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(getMoreMovieByPage.fulfilled, (state, action) => {
        const lists = state.lists
        const newList = _.concat(lists, action.payload?.results || [])
        state.loading = false
        state.lists = _.uniqBy(newList, 'id')
        state.page++
        if (state.isSearching && state.searchQuery) {
          state.filteredLists = state.lists.filter(movie =>
            movie.title.toLowerCase().includes(state.searchQuery) ||
            movie.overview.toLowerCase().includes(state.searchQuery)
          )
        }
      })
      .addCase(getMoreMovieByPage.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getMoreMovieByPage.pending, (state) => {
        state.loading = true
      })
  }
})

export const getListMovieByCategory = createAsyncThunk(
  'movie/getListMovieByCategory',
  async (data: any, thunkAPI) => {
    const { category, page } = data
    const language = "en-US"

    try {
      const res = await apiGet(`movie/${category}?language=${language}&page=${page}`)
      return res

    } catch (error) {
      console.log('Error get movie list', error)
    }
  },
)

export const getMoreMovieByPage = createAsyncThunk(
  'movie/getMoreMovieByPage',
  async (data: any, thunkAPI) => {
    const movie = (thunkAPI.getState() as RootState).movie
    const language = "en-US"
    const nextPage = ++movie.page
    const category = movie.selectedCategory

    try {
      const res = await apiGet(`movie/${category}?language=${language}&page=${nextPage}`)
      return res

    } catch (error) {
      console.log('Error get movie list', error)
    }

  }
)


export const { sortListBy, setSelectedCategory, searchMovies, clearSearch } = movieSlice.actions
export default movieSlice.reducer