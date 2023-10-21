import { createSlice } from "@reduxjs/toolkit";

 interface RuleAndPlayers {
   finalList :any [];
 }
 
 const initialState:RuleAndPlayers = {
   finalList : [],
 }

 export const ruleAndPlayersSlice = createSlice({
    name: "finalList",
    initialState,
    reducers:{
       setFinalList: (state,action) => {
          state.finalList = action.payload.map( (item :any) => item)

       },       
    }
 });


 export const {setFinalList } = ruleAndPlayersSlice.actions; 
 export default ruleAndPlayersSlice.reducer;