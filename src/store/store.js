import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";

const store=configureStore({
    reducer:{
        auth:authSlice,
        //TODO: post: postSlice add more slicer for post
    }
});

export default store;