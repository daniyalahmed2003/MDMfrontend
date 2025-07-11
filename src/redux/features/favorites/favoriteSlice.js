import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      return state.filter((product) => product._id !== action.payload._id);
    },
    setFavorites: (state, action) => {
      return action.payload;
    },
    toggleFavorite: (state, action) => {
      const index = state.findIndex((p) => p._id === action.payload._id);
      if (index >= 0) {
        // If already in favorites, remove it
        state.splice(index, 1);
      } else {
        // Otherwise, add to favorites
        state.push(action.payload);
      }
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
  toggleFavorite,
} = favoriteSlice.actions;

export const selectFavoriteProduct = (state) => state.favorites;
export default favoriteSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const favoriteSlice = createSlice({
//   name: "favorites",
//   initialState: [],
//   reducers: {
//     addToFavorites: (state, action) => {
//       // Checkif the product is not already favorites
//       if (!state.some((product) => product._id === action.payload._id)) {
//         state.push(action.payload);
//       }
//     },
//     removeFromFavorites: (state, action) => {
//       // Remove the product with the matching ID
//       return state.filter((product) => product._id !== action.payload._id);
//     },
//     setFavorites: (state, action) => {
//       // Set the favorites from localStorage
//       return action.payload;
//     },
//   },
// });

// export const { addToFavorites, removeFromFavorites, setFavorites } =
//   favoriteSlice.actions;
// export const selectFavoriteProduct = (state) => state.favorites;
// export default favoriteSlice.reducer;
