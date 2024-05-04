/*=====================================
    configureStore

    Author: Gray
    CreateTime: 2024 / 05 / 03
=====================================*/
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./modules/appReducer";
import drawReducer from "./modules/drawReducer";

/*--------------------------
    rootStore Export
--------------------------*/
const actionReducers = combineReducers({
    app: appReducer,
    draw: drawReducer,
});

const rootStore = configureStore({
    reducer: actionReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default rootStore;
export type RootState = ReturnType<typeof actionReducers>;
export type RootDispatch = typeof rootStore.dispatch;
