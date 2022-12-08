import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPayment, getPaymentRecord } from "../firebaseFunction";

export const getPayment = createAsyncThunk(
  "/users/getPayments",
  async (order) => {
    let data = await getPaymentRecord(order);
    return data;
  }
);

const initialState = {
  order: [],
  isLoading: true,
};

export const saleReportSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    reload: (state, action) => {
      state.order.orderNum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPayment.fulfilled, (state, action) => {  
      // console.log(action.payload);
      if(action.payload.length != 0) state.order= action.payload[0].orders
    });
  },
});

export const { reload } =
saleReportSlice.actions;

export default saleReportSlice.reducer;
