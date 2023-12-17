import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../../utils/apiUrl";

const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

export const userRegisterAction = createAsyncThunk(
  "user/register",
  async (
    { fullname, email, password },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${apiUrl}/users/register`,
        {
          fullname,
          email,
          password,
        },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userLoginAction = createAsyncThunk(
  "post/login",
  async ({ email, password }, { rejectWithValue, dispatch, getState }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${apiUrl}/users/login`,
        { email, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlices = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userRegisterAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegisterAction.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuth = action.payload;
        state.userAuth.error = null;
      })
      .addCase(userRegisterAction.rejected, (state, action) => {
        state.loading = false;
        state.userAuth.error = action.payload;
      });

    builder
      .addCase(userLoginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLoginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuth = action.payload;
        state.userAuth.error = null;
      })
      .addCase(userLoginAction.rejected, (state, action) => {
        state.loading = false;
        state.userAuth.error = action.payload;
      });
  },
});

const usersReducer = usersSlices.reducer;

export default usersReducer;
