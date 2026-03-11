import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers/reducers";
import { useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseAPI } from "../rest-api/baseAPI";




export const store = configureStore({
    reducer: reducers,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(
            baseAPI.middleware,
        ),
 devTools: process.env.NODE_ENV !== "production",

})

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//Typed Hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();


setupListeners(store.dispatch);


export default store;