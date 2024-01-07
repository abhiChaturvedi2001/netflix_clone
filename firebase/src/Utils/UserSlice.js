import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userInfo",
    initialState: null,
    reducers: {
        addUsers: (state, action) => {
            return action.payload
        },
        removeUsers: (state) => {
            return null
        }
    }
})

export const { addUsers, removeUsers } = userSlice.actions;
export default userSlice.reducer