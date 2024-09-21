import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser, IUserInfo} from "./user.interface";

interface UserState {
    isLoading: boolean
    isSuccess: boolean
    userInfo: IUser
}

const initialState: UserState = {
    isLoading: false,
    isSuccess: false,
    userInfo: {} as IUser
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        attemptLogin: (state, _action: PayloadAction<IUserInfo>) => {
            state.isLoading = true;
        },
        attemptLoginSuccess: (state, action: PayloadAction<IUser>) => {
            const {name, id, email} = action.payload
            state.isLoading = false;
            state.isSuccess = true;
            state.userInfo = {name, id, email};
        },
        attemptLoginFailed: (state) => {
            state.isLoading = false;
        },
        resetLoginState: (state) => {
            state.isSuccess = false;
        }
    }
})

export const {
    attemptLogin,
    attemptLoginSuccess,
    attemptLoginFailed,
    resetLoginState,
} = userSlice.actions;

export default userSlice.reducer;
