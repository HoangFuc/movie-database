import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  lists: [],
  selectedCategory: ''
}

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setList(state, action) {

    },
    setSelectedCategory(state, action) {
      console.log('==============selecte', action.payload);
      state.selectedCategory = action.payload
    }
  },
  extraReducers: (builder) => {

  }
})

export const { setList, setSelectedCategory } = movieSlice.actions
export default movieSlice.reducer