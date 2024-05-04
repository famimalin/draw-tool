/*=====================================
    app 的 redux

    Author: Gray
    CreateTime: 2024 / 05 / 03
=====================================*/
import { createSlice } from "@reduxjs/toolkit";

/*--------------------------
    store initial state
--------------------------*/
interface AppState {
    numberInputModal: {
        isOpen: boolean;
        title?: string;
        desc?: string;
        defaultValue?: number;
        callback?: (value: number) => void;
    };
}

const initialState = {
    numberInputModal: {
        isOpen: false,
    },
} as AppState;

const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        openNumberInputModal: (
            state,
            actions: {
                payload: {
                    title?: string;
                    desc?: string;
                    defaultValue?: number;
                    callback?: (value: number) => void;
                };
            }
        ) => {
            const { payload } = actions;
            state.numberInputModal.isOpen = true;
            state.numberInputModal.title = payload.title;
            state.numberInputModal.desc = payload.desc;
            state.numberInputModal.defaultValue = payload.defaultValue;
            state.numberInputModal.callback = payload.callback;
        },
        closeNumberInputModal: (state) => {
            state.numberInputModal.isOpen = false;
        },
    },
    extraReducers: (builder) => {},
});

/*--------------------------
    Exprot
--------------------------*/
const AppReducer = appSlice.reducer;
const AppActions = appSlice.actions;

export default AppReducer;
export { AppActions };
