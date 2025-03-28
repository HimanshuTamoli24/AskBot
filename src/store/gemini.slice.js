import { createSlice } from "@reduxjs/toolkit"

const intialState = { messages: [] }
const geminiSlice = createSlice({
    name: 'gemini',
    initialState: intialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        clearMessages: (state) => {
            state.messages = [];
        },
    },
})


export const { addMessage, clearMessages } = geminiSlice.actions;

export default geminiSlice.reducer