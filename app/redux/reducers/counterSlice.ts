import { createSlice } from "@reduxjs/toolkit";

interface RolesState {
    value:[];
 }
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
       
    }
 });

 export const {addPlayer } = playersSlice.actions; 
 export default playersSlice.reducer;