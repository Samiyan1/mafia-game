import { configureStore } from "@reduxjs/toolkit";
import playersSlice from '../reducers/counterSlice'
import ruleAndPlayersSlice from '../reducers/ruleAndplayers'

const store = configureStore({
    reducer : {
        playersSlice,
        ruleAndPlayersSlice,
    }
}) ;

export default store;