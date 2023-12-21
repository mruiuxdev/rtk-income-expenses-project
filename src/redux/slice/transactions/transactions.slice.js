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

export const editTransactionAction = createAsyncThunk(
  "transaction/edit",
  async (
    { id, name, amount, transactionType, category, notes },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${apiUrl}/transactions/${id}`,
        {
          name,
          amount,
          transactionType,
          category,
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

export const getTransactionAction = createAsyncThunk(
  "transaction/get",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${apiUrl}/transactions/${id}`, config);

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

    builder
      .addCase(editTransactionAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTransactionAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = true;
        state.transaction = action.payload;
        state.error = null;
      })
      .addCase(editTransactionAction.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.transaction = null;
        state.error = action.payload;
      });

    builder
      .addCase(getTransactionAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionAction.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
        state.error = null;
      })
      .addCase(getTransactionAction.rejected, (state, action) => {
        state.loading = false;
        state.transaction = null;
        state.error = action.payload;
      });
  },
});

const transactionsReducer = transactionsSlice.reducer;

export default transactionsReducer;
