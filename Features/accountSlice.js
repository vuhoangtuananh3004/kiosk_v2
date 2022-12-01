import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, loginUserWithEmailAndPassword, userExisted } from "../firebaseFunction";

export const createUserWithEmailAndPass = createAsyncThunk(
    "/users/signup",
    async (userObj) => {
      let data = await userExisted(userObj);
      if (data) {
        alert("Account in used");
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
    reload: (state, action) => {
     
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

export const { reload } = accountSlice.actions;

export default accountSlice.reducer;
