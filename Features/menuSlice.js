import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMenuCategories, createUserWithEmailAndPassword, getMenuCategory } from "../firebaseFunction";

export const getMenuCategories = createAsyncThunk(
    "/users/categories",
    async (nameBussiness) => {
      let data = await getMenuCategory(nameBussiness);
      return data;
    }
  );

const initialState = {
  categories : null,
  isLoading: false
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    reload: (state, action) => {
     state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMenuCategories.fulfilled, (state, action) => {
       state.categories = action.payload;
       state.isLoading = true;
    })
  },
});

export const { reload } = menuSlice.actions;

export default menuSlice.reducer;
