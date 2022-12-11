import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// Store all function relate to create an model, add topping, ingredients...
const initialState = {
    sectionTopping: {},
};

export const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    reload: (state, action) => {
     state.isLoading = false;
    },
    loadSectionTopping: (state, action) => {
        state.sectionTopping = action.payload;
    }
    ,
    setSectionToppings: (state, action) => {
        let temp = action.payload
        state.sectionTopping = {...state.sectionTopping, ...temp}
    },
    updateNewIngredientName: (state, action) => {
        state.sectionTopping[action.payload.newKey] = state.sectionTopping[action.payload.keyValue]
        delete state.sectionTopping[action.payload.keyValue]
    },
    deleteIngredient: (state, action) => {
        delete state.sectionTopping[action.payload.keyValue]
    }
    ,
    updateToppings: (state, action) => {
    let tempArray = state.sectionTopping[action.payload.keyValue]
    state.sectionTopping[action.payload.keyValue] = [...tempArray, action.payload.newTopping]
    },
    removeToppings: (state, action) => {
        state.sectionTopping[action.payload.keyValue] = state.sectionTopping[action.payload.keyValue].filter(el => el.name != action.payload.name)
    },
  },
});

export const { reload, setSectionToppings, updateToppings, removeToppings, updateNewIngredientName, deleteIngredient, loadSectionTopping } = modelSlice.actions;

export default modelSlice.reducer;
