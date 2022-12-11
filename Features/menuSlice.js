import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMenuCategories, createUserWithEmailAndPassword, getMenu, getMenuCategory } from "../firebaseFunction";
// Store all function relate to menu 'after model and item were created', get all menu from database
export const getMenuCategories = createAsyncThunk(
    "/users/categories",
    async (nameBussiness) => {
      let data = await getMenuCategory(nameBussiness);
      return data;
    }
  );
export const getMenus = createAsyncThunk(
    "/users/getMenus",
    async (nameBussinessCategory) => {
      let data = await getMenu(nameBussinessCategory)
      return data;
    }
  );

const initialState = {
  categories : null,
  menu: null,
  isLoading: false
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    reload: (state, action) => {
     state.isLoading = !state.isLoading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMenuCategories.fulfilled, (state, action) => {
       state.categories = action.payload;
       state.categories = state.categories.sort(function (a,b) { return a.id - b.id})
       state.isLoading = true;
    }),
    builder.addCase(getMenus.fulfilled, (state, action) => {
      state.menu = action.payload;
      // state.menu = state.menu.sort(function (a,b) { return a.id - b.id})
      state.isLoading = true;
   })
  },
});

export const { reload } = menuSlice.actions;

export default menuSlice.reducer;
