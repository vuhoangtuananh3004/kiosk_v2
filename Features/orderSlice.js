import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPayment, getPaymentRecord } from "../firebaseFunction";

export const makePayment = createAsyncThunk(
  "/users/payments",
  async (order) => {
    await addPayment(order);
    return order;
  }
);
export const getPayment = createAsyncThunk(
  "/users/getPayments",
  async (order) => {
    let data = await getPaymentRecord(order);
    return data

  }
);
const defaultState = {
  order: {
    orderNum: 0,
    orderItems: [],
    subTotal: 0.0,
    paymentInfo: "",
    total: 0,
    saleTax: 10.25,
  },
};

const initialState = {
  order: {
    orderNum: 0,
    orderItems: [],
    subTotal: 0.0,
    paymentInfo: "",
    total: 0,
    saleTax: 10.25,
  },
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    cancelOrder: (state, action) => {
      state.order = defaultState.order;
    },
    addToOrder: (state, action) => {
      state.order.orderItems = [...state.order.orderItems, action.payload.item];
      state.order.subTotal = state.order.subTotal + action.payload.subTotal;
      let number = state.order.subTotal + (state.order.subTotal * 10.25) / 100;
      state.order.total = Math.round(number * 100) / 100;
    },
    orderNumber: (state, action) => {
      state.order.orderNum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makePayment.fulfilled, (state, action) => {
      state.order.paymentInfo = action.payload.paymentInfo;
      state.order.status = "successfull";
    });
    builder.addCase(getPayment.fulfilled, (state, action) => {  
    
      let count = action.payload[0].countTicket + 1
      // let tempLength = action.payload[0].orders.length
      // if (tempLength == 0) state.order.orderNum = 1;
      // else state.order.orderNum = action.payload[0].orders[tempLength - 1].order.orderNum + 1
      state.order.orderNum = count
     
       


    });
  },
});

export const { resetPrice, addToOrder, cancelOrder, orderNumber } =
  orderSlice.actions;

export default orderSlice.reducer;
