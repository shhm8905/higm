import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courseSlice";
import userReducer from "./userSlice";
import videoReducer from "./videoSlice";

const store = configureStore({
    reducer: {
        course: courseReducer,
        video: videoReducer,
        user: userReducer
    }
})

export default store;