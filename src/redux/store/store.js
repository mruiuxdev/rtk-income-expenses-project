import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slice/users/users.slice";
import accountsReducer from "../slice/accounts/accounts.slice";
import transactionsReducer from "../slice/transactions/transactions.slice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    accounts: accountsReducer,
    transactions: transactionsReducer,
  },
});

export default store;
