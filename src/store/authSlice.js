import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload.userData;
        },
        logout:(state)=>{
        state.status=false;
        state.userData=null;
        }
    }
})
export const{login,logout}=authSlice.actions;
//createSlice se jo reducers bnti hain bnti hain unke name ko action bolte hain e.g. login logout
//so we have to export the indiviidual actions as well
export default authSlice.reducer;