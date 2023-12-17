import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slice/users/users.slice";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
