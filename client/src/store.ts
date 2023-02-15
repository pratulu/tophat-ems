import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./slices/counter/CounterSlice";
import AppReducer from "./slices/app/AppSlice";
import EmployeeReducer from "./slices/app/EmployeeSlice";
import CandidatesReducer from "./slices/app/CandidateSlice";

export const store = configureStore({
  reducer: {
    app: AppReducer,
    employees: EmployeeReducer,
    candidates: CandidatesReducer,
    counter: CounterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
