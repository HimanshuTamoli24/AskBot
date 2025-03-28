import { configureStore } from "@reduxjs/toolkit";
import geminiSlice from "./gemini.slice.js"
import sidebarSlice from "./sidebar.js";
const store = configureStore({
    reducer: {
        gemini: geminiSlice,
        sidebar: sidebarSlice
    }
})

export default store;