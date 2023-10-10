import { configureStore } from "@reduxjs/toolkit";
import playersSlice from '../reducers/counterSlice'
const store = configureStore({
    reducer : {
        playersSlice
    }
}) ;

export default store;