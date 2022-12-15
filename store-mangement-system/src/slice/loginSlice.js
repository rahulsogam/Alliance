import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name:'login',
    initialState:{
        user:{},
        manager:false,
        access:false    
    },
    reducers:{
        loginSuccess: (state,action)=>{
            state.access = action.payload.status
            state.user= action.payload
        }
    }
})
export const { loginSuccess } = loginSlice.actions

export default loginSlice.reducer


