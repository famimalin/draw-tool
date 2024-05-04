/*=====================================
    draw 的 redux

    Author: Gray
    CreateTime: 2024 / 05 / 03
=====================================*/
import { createSlice } from "@reduxjs/toolkit";
import { getRandomDrawUser } from "../../utils/drawUtil";
import DrawUserInfo from "../../types/data/draw/drawUserInfo.interface";
import LocalStorageUtil from "../../utils/localStorageUtil";

/*--------------------------
    Variable
--------------------------*/
const CACHE_DRAWUSERLIST_KEY = "drawUserList";
const CACHE_DRAWUSERMAP_KEY = "drawUserMap";
const CACHE_WINNERUSERID_KEY = "winnerUserId";

/*--------------------------
    store initial state
--------------------------*/
interface DrawState {
    drawUserList: string[];
    drawUserMap: { [id: string]: DrawUserInfo };
    winnerUserId?: string;
}

// 如果 local storage 內有暫存資料的話，把她加進來
const getInitState = () => {
    const drawUserList = LocalStorageUtil.getItemObj<string[]>(CACHE_DRAWUSERLIST_KEY, []);
    const drawUserMap = LocalStorageUtil.getItemObj<{ [id: string]: DrawUserInfo }>(
        CACHE_DRAWUSERMAP_KEY,
        {}
    );
    const winnerUserId = LocalStorageUtil.getItemJSON(CACHE_WINNERUSERID_KEY) || undefined;

    return {
        drawUserList: drawUserList,
        drawUserMap: drawUserMap,
        winnerUserId: winnerUserId,
    } as DrawState;
};

const initialState = getInitState();

const drawSlice = createSlice({
    name: "draw",
    initialState: initialState,
    reducers: {
        clearDrawUserList: (state) => {
            state.drawUserList.length = 0;
            state.drawUserMap = {};
        },
        generateDrawUserList: (
            state,
            actions: {
                payload: {
                    total: number;
                };
            }
        ) => {
            const { payload } = actions;
            const checkSet = new Set<string>();

            // 預防萬一 還是清空再加新東西
            state.drawUserList.length = 0;
            state.drawUserMap = {};

            let count = 0;

            while (count < payload.total) {
                const user = getRandomDrawUser();
                const checkKey = `${user.name}-${user.gender}-${user.gender}`;

                if (checkSet.has(checkKey)) {
                    continue;
                }

                state.drawUserList.push(user.id);
                state.drawUserMap[user.id] = user;

                checkSet.add(checkKey);
                count++;
            }

            LocalStorageUtil.setItem(CACHE_DRAWUSERLIST_KEY, state.drawUserList);
            LocalStorageUtil.setItem(CACHE_DRAWUSERMAP_KEY, state.drawUserMap);
        },
        generateWinnerDrawUser: (state) => {
            const size = state.drawUserList.length;
            const randomIndex = Math.floor(Math.random() * size);
            const winnerUserId = state.drawUserList[randomIndex];
            state.winnerUserId = winnerUserId;

            LocalStorageUtil.setItem(CACHE_WINNERUSERID_KEY, state.winnerUserId);
        },
        clearWinnerDrawUser: (state) => {
            state.winnerUserId = undefined;

            LocalStorageUtil.removeItem(CACHE_WINNERUSERID_KEY);
        },
    },
    extraReducers: (builder) => {},
});

/*--------------------------
    Exprot
--------------------------*/
const DrawReducer = drawSlice.reducer;
const DrawActions = drawSlice.actions;
export default DrawReducer;
export { DrawActions };
