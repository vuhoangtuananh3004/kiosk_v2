import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bussinessNameExisted, createUserWithEmailAndPassword, loginUserWithEmailAndPassword, userExisted } from "../firebaseFunction";

// Store all function relate to an account, Sign up, login , logout, check user Existed
export const createUserWithEmailAndPass = createAsyncThunk(
    "/users/signup",
    async (userObj) => {
      let data = await userExisted(userObj);
      if (data) {
        alert("Account in used");
        return false;
      }
      data = await bussinessNameExisted(userObj)
      if (data.length != 0) {
        alert("Bussiness name in used");
        return false;
      }
      data = await createUserWithEmailAndPassword(userObj);
      return true;
    }
  );
  export const loginUserWithEmailAndPass = createAsyncThunk(
    "/users/login",
    async (userObj) => {
        let data = await loginUserWithEmailAndPassword(userObj)
        return data;
    }
  );

const initialState = {
  user: null,
  isSignUp: false,
  userLoading: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.user = null;
      state.userLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUserWithEmailAndPass.fulfilled, (state, action) => {
       state.isSignUp = action.payload;
    })
      builder.addCase(loginUserWithEmailAndPass.fulfilled, (state, action) => {
        state.user = action.payload;
      })
  },
});

export const { logOut } = accountSlice.actions;

export default accountSlice.reducer;
