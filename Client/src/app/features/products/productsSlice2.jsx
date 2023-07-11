import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products2: [],
};

export const productsSlice2 = createSlice({
  name: "products2",
  initialState,
  reducers: {
    searchProduct2: (state, action) => {
      state.products2 = action.payload;
    },
  },
});

export const { searchProduct2 } = productsSlice2.actions;

export const productsAll2 = (state) => state.products2.products2;

export default productsSlice2.reducer;
