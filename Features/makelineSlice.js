import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, deletePaymentRecord, getUpdateModel, loginUserWithEmailAndPassword, transferPaymentRecordToHist, userExisted, addPayment, getPaymentRecord } from "../firebaseFunction";

export const orderReady = createAsyncThunk(
  "/users/orderReady",
  async (obj) => {
     await deletePaymentRecord({name: obj.name, obj: obj.obj});
     await transferPaymentRecordToHist({name: obj.name, obj: obj.obj})
  }
);
export const getPayment = createAsyncThunk(
  "/users/getPaymentsHist",
  async (order) => {
    let data = await getPaymentRecord(order);
    return data;
  }
);
const initialState = {
  order: [],
};

export const makelineSlice = createSlice({
  name: "makeline",
  initialState,
  reducers: {
    resetPrice: (state, action) => {
      state.itemModel.itemPrice = [];
    }, 
    extraReducers: (builder) => {
      builder.addCase(getPayment.fulfilled, (state, action) => {  
        if(action.payload.length != 0) state.order= action.payload[0].orders
      });
    },
  }, 
});

export const { resetPrice } = makelineSlice.actions;

export default makelineSlice.reducer;
