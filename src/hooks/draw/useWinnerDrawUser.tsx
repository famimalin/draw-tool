/*=====================================
    useWinnerDrawUser 

    Author: Gray
    CreateTime: 2024 / 05 / 04
=====================================*/

import { useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";

/*--------------------------
    Main 
--------------------------*/

const useWinnerDrawUser = () => {
    const winnerUserId = useSelector((state: RootState) => state.draw.winnerUserId);
    const drawUserMap = useSelector((state: RootState) => state.draw.drawUserMap);
    const winnerUser = winnerUserId ? drawUserMap[winnerUserId] : undefined;

    return winnerUser;
};

export default useWinnerDrawUser;
