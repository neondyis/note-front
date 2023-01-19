import {configureStore} from "@reduxjs/toolkit";
import noteReducer from "./noteReducer";

export const noteStore = configureStore(
    {
        reducer: noteReducer
    }
)

export type RootState = ReturnType<typeof noteStore.getState>
export type AppDispatch = typeof noteStore.dispatch