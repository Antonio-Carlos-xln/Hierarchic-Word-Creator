import { configureStore } from '@reduxjs/toolkit';
import dataReducer from "./jsonSlice";
import cursorReducer from "./cursorSlice";
        
export const store = configureStore({
  reducer: {
    data: dataReducer,
    cursor: cursorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type AppStore = typeof store;
