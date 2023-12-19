import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../../utils/apiUrl";

const initialState = {
  loading: false,
  transaction: null,
  transactions: [],
  error: null,
  isAdded: false,
  isUpdated: false,
};

export const createTransactionAction = createAsyncThunk(
  "/transaction/create",
  async (
    { id, name, transactionType, amount, category, notes },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.post(
        `${apiUrl}/transactions`,
        {
          name,
          transactionType,
          amount,
          category,
          notes,
          account: id,
        },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createTransactionAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTransactionAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdded = true;
        state.transaction = action.payload;
        state.error = null;
      })
      .addCase(createTransactionAction.rejected, (state, action) => {
        state.loading = false;
        state.isAdded = false;
        state.transaction = null;
        state.error = action.payload;
      });
  },
});

const transactionsReducer = transactionsSlice.reducer;

export default transactionsReducer;
