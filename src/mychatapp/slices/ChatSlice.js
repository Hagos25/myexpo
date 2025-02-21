import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchMessagesRequest: (state) => {
            state.loading = true;
        },
        fetchMessagesSuccess: (state, action) => {
            state.loading = false;
            state.messages = action.payload;
        },
        fetchMessagesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        sendMessageRequest: (state) => {
            state.loading = true;
        },
        sendMessageSuccess: (state, action) => {
            state.loading = false;
            state.messages.unshift(action.payload);
        },
        sendMessageFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { 
    fetchMessagesRequest, fetchMessagesSuccess, fetchMessagesFailure, 
    sendMessageRequest, sendMessageSuccess, sendMessageFailure 
} = chatSlice.actions;

export default chatSlice.reducer;