import { baseAPI } from "@/redux/rest-api/baseAPI";
import { combineReducers } from "@reduxjs/toolkit";



const reducers = combineReducers({
    [baseAPI.reducerPath]: baseAPI.reducer
})


export default reducers;