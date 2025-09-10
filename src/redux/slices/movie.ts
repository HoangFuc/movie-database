import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_BASE_URL, apiGet } from "../../libs/api";
import _ from "lodash";
import { Alert } from "react-native";

const initialState = {
  lists: [],
  selectedCategory: 'now_playing',
  loading: false
}

const ALPHA = "alpha"

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    sortListBy(state, action) {
      const type = action.payload
      const lists = state.lists
      if (_.isEmpty(lists)) return Alert.alert("Notify", "Missing list movie to sort !")
      
      if (type == 'alpha') {
        _.sortBy(lists, 'title')
      }
      state.lists = action.payload
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListMovieByCategory.fulfilled, (state, action) => {
        state.loading = false
        state.lists = action.payload?.results || []
      })
      .addCase(getListMovieByCategory.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getListMovieByCategory.pending, (state) => {
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
export const { sortListBy, setSelectedCategory } = movieSlice.actions
export default movieSlice.reducer