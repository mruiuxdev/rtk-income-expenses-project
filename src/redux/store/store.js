import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slice/users/users.slice";
import accountsReducer from "../slice/accounts/accounts.slice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    accounts: accountsReducer,
  },
});

export default store;
