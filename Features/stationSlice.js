import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
   station: ""
};

export const stationSlice = createSlice({
  name: "station",
  initialState,
  reducers: {
    switchStation: (state, action) => {
     state.station = action.payload;
    },
  },
});

export const { switchStation} = stationSlice.actions;

export default stationSlice.reducer;
