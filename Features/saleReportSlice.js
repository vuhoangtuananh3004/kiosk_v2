import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPayment, getPaymentRecord, getHistoryOrder } from "../firebaseFunction";

export const getHistory = createAsyncThunk(
  "/users/getPaymentsHist",
  async (order) => {
    let data = await getHistoryOrder(order)
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
    builder.addCase(getHistory.fulfilled, (state, action) => {  
      if(action.payload.length != 0) state.order= action.payload[0].orders.sort(function (a,b) { return a.order.orderNum - b.order.orderNum })
    });
  },
});

export const { reload } =
saleReportSlice.actions;

export default saleReportSlice.reducer;
