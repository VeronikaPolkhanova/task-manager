import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tasksReducer from "./slices/tasksSlice";
import listsReducer from "./slices/listSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lists: listsReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
