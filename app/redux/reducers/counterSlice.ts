import { createSlice } from "@reduxjs/toolkit";

 interface PlayersState {
    players :string[];
 }
 
 const initialState:PlayersState = {
    players:[],
 }

 export const playersSlice = createSlice({
    name: "playersList",
    initialState,
    reducers:{
       addPlayer: (state,action) => {
          state.players.push(action.payload)
       },
       removePlayer: (state,action) => {
         const array = state.players.filter(name => name !== action.payload);
         state.players = array;
      },
       
    }
 });

 export const {removePlayer } = playersSlice.actions; 

 export const {addPlayer } = playersSlice.actions; 
 export default playersSlice.reducer;