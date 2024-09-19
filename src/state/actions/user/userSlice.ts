import {createSlice, PayloadAction} from '@reduxjs/toolkit'
interface UserState {
    isLoading: boolean
}

const initialState: UserState = {
    isLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        attemptLogin: (state) => {
            state.isLoading = true;
        },
        attemptLoginSuccess: (state, action : PayloadAction<boolean>) => {
            state.isLoading = false;
        },
        attemptLoginFailed: (state, action: PayloadAction<boolean>) => {
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
