import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";
import todoSlice from "./features/todo/todoSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    todo: todoSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
