import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signupRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        signupSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        signupFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logoutRequest: (state) => {
            state.user = null;
        },
        logoutSuccess: (state) => {
            state.loading = false;
            state.user = null;
        },
        logoutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { 
    loginRequest, loginSuccess, loginFailure, 
    signupRequest, signupSuccess, signupFailure, 
    logoutRequest,logoutSuccess,logoutFailure
} = authSlice.actions;

export default authSlice.reducer;