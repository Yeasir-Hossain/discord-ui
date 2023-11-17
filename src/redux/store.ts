import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "./reducers/channels";
export const store = configureStore({
  reducer: {
    channelStore: channelReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch