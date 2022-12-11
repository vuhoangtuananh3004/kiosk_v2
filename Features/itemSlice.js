import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getUpdateModel, loginUserWithEmailAndPassword, userExisted } from "../firebaseFunction";
// Store all function relate to Item such as create Item, remove Item, load Item from database.
export const updateModel = createAsyncThunk(
  "/users/updateModel1",
  async (nameBussiness) => {
    let data = await getUpdateModel(nameBussiness);
    console.log(data);
    return data;
  }
);
const initialState = {
 itemModel: {
    name: '',
    imgUrl:'',
    itemPrice: [],
    model: {},
    category:''
 }
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    resetPrice: (state, action) => {
      state.itemModel.itemPrice = [];
    },
    loadItemModel: (state, action) => {
      state.itemModel.model = action.payload;
    },
    setImg: (state, action) => {
      state.itemModel = {...state.itemModel, imgUrl: action.payload}
    },
    setName: (state, action) => {
      state.itemModel ={...state.itemModel, name: action.payload.name, category: action.payload.categoryName}
    }
    ,
    addItemQuantity: (state, action) => {
     let [keyValue, index1] = [action.payload.keyValue, action.payload.index]
     let model =  state.itemModel.model
     let temp = model[keyValue].map((doc, index)=> {
      if (index == index1){
        let count = doc.quantity
        count = count + 1;
        return {...doc, quantity: count}
      }
      return doc
     })
     let tempModel = {}
     for (const [key, value] of Object.entries(model)) {
       if (key != keyValue) tempModel[key] = value
       if (key == keyValue) tempModel[keyValue] = temp
     }

     state.itemModel = {...state.itemModel, model: tempModel}
    },
    substractItemQuantity: (state, action) => {
      let [keyValue, index1] = [action.payload.keyValue, action.payload.index]
      let model =  state.itemModel.model
      let temp = model[keyValue].map((doc, index)=> {
       if (index == index1){
         let count = doc.quantity
         if (count > 0) count = count - 1;
         return {...doc, quantity: count}
       }
       return doc
      })
      let tempModel = {}
      for (const [key, value] of Object.entries(model)) {
        if (key != keyValue) tempModel[key] = value
        if (key == keyValue) tempModel[keyValue] = temp
      }
 
      state.itemModel = {...state.itemModel, model: tempModel}
    },
    addItemPrice: (state, action) => {
      state.itemModel.itemPrice = [...state.itemModel.itemPrice, action.payload]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateModel.fulfilled, (state, action) => {
      // state.itemModel.model = {[...action.payload]}
      // console.log(state.itemModel.model);
      // state.menu = state.menu.sort(function (a,b) { return a.id - b.id})

   })
  },
});

export const { addItemQuantity, addItemPrice, updateItemPrice, loadItemModel, substractItemQuantity, setImg, setName, resetPrice } = itemSlice.actions;

export default itemSlice.reducer;
