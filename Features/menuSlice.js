import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMenuCategories, createUserWithEmailAndPassword, getMenu, getMenuCategory } from "../firebaseFunction";

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
     state.isLoading = false;
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
      console.log(action.payload);
      // state.menu = state.menu.sort(function (a,b) { return a.id - b.id})
      state.isLoading = true;
   })
  },
});

export const { reload } = menuSlice.actions;

export default menuSlice.reducer;
