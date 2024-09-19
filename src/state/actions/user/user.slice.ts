import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUserInfo} from "./user.interface";

interface UserState {
    isLoading: boolean
    isSuccess: boolean
}

const initialState: UserState = {
    isLoading: false,
    isSuccess: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        attemptLogin: (state, _action: PayloadAction<IUserInfo>) => {
            console.log("=====attemptLogin==slice===")
            state.isLoading = true;
        },
        attemptLoginSuccess: (state, action: PayloadAction<IUserInfo>) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        attemptLoginFailed: (state) => {
            state.isLoading = false;
        }
    }
})

export const {
    attemptLogin,
    attemptLoginSuccess,
    attemptLoginFailed,
} = userSlice.actions;

export default userSlice.reducer;
