/*=====================================
    useDrawUserList 

    Author: Gray
    CreateTime: 2024 / 05 / 03
=====================================*/

import { useDispatch, useSelector } from "react-redux";
import { useEffectOnce } from "react-use";
import { RootState } from "../../redux/configureStore";
import { DrawActions } from "../../redux/modules/drawReducer";
import { useCallback, useMemo } from "react";
import DrawUserInfo from "../../types/data/draw/drawUserInfo.interface";

/*--------------------------
    Vartiable
--------------------------*/
const DefaultUserSize = 30;
let IS_HOOKS_LOADING = false;

/*--------------------------
    Main 
--------------------------*/
const useDrawUserList = () => {
    const dispatch = useDispatch();

    const drawUserList = useSelector((state: RootState) => state.draw.drawUserList);
    const drawUserMap = useSelector((state: RootState) => state.draw.drawUserMap);

    const dataList = useMemo(() => {
        const list: DrawUserInfo[] = [];
        drawUserList.forEach((id) => {
            const drawUser = drawUserMap[id];
            if (drawUser) {
                list.push(drawUser);
            }
        });
        return list;
    }, [drawUserList, drawUserMap]);

    const generateDrawUserList = useCallback(
        async (total: number) => {
            await dispatch(DrawActions.generateDrawUserList({ total: total }));
        },
        [dispatch]
    );

    const init = async () => {
        if (IS_HOOKS_LOADING || drawUserList.length > 0) {
            return;
        }

        IS_HOOKS_LOADING = true;
        await generateDrawUserList(DefaultUserSize);
        IS_HOOKS_LOADING = false;
    };

    useEffectOnce(() => {
        init();
    });

    return { dataList, generateDrawUserList };
};

export default useDrawUserList;
