import { createSlice } from "@reduxjs/toolkit";

 interface RuleAndPlayers {
    list :any [];
 }
 
 const initialState:RuleAndPlayers = {
   list : [],
 }

 export const ruleAndPlayersSlice = createSlice({
    name: "list",
    initialState,
    reducers:{
       addPlayer: (state,action) => {
          state.list.push(action.payload)
       },
       removePlayer: (state,action) => {
         const array = state.list.filter(name => name !== action.payload);
         state.list = array;
      },
       
    }
 });

 export const {removePlayer } = ruleAndPlayersSlice.actions; 

 export const {addPlayer } = ruleAndPlayersSlice.actions; 
 export default ruleAndPlayersSlice.reducer;