import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../../utils/apiUrl";

const initialState = {
  account: null,
  accounts: [],
  error: null,
  loading: false,
  success: false,
  isUpdated: false,
};

export const createAccountAction = createAsyncThunk(
  "account/create",
  async (
    { name, accountType, initialBalance, notes },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${apiUrl}/accounts`,
        {
          name,
          accountType,
          initialBalance,
          notes,
        },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAccountDetailsAction = createAsyncThunk(
  "/accounts/id",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${apiUrl}/accounts/${id}`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createAccountAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAccountAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.account = action.payload;
      })
      .addCase(createAccountAction.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.account = null;
        state.error = action.payload;
      });

    builder
      .addCase(getAccountDetailsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAccountDetailsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.account = action.payload;
      })
      .addCase(getAccountDetailsAction.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.account = null;
        state.error = action.payload;
      });
  },
});

const accountsReducer = accountsSlice.reducer;

export default accountsReducer;
