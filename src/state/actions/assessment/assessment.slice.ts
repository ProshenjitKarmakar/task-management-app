import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface UserState {
    isLoading: boolean
}

const initialState: UserState = {
    isLoading: false
}

export const assessmentSlice = createSlice({
    name: 'assessment',
    initialState: initialState,
    reducers: {
        attemptDispatch: (state) => {
            console.log("====attemptDispatch=====");
            state.isLoading = true;
        },
        attemptDispatchSuccess: (state, action: PayloadAction<boolean>) => {
            state.isLoading = false;
        },
        attemptDispatchFailed: (state) => {
            state.isLoading = false;
        }
    }
})

export const {
    attemptDispatch,
    attemptDispatchSuccess,
    attemptDispatchFailed,
} = assessmentSlice.actions;

export default assessmentSlice.reducer;
