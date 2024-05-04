/*=====================================
    useCountDown 

    Author: Gray
    CreateTime: 2024 / 05 / 03
=====================================*/

import { useRef, useState } from "react";
import { useEffectOnce, useUnmount, useUpdateEffect } from "react-use";

/*--------------------------
    Main 
--------------------------*/
type Payload = {
    countDownSecond: number; // 準備倒數的時間
};

const useCountDown = (payload: Payload) => {
    const { countDownSecond } = payload;

    const timer = useRef<NodeJS.Timeout>();
    const [time, setTime] = useState<number>(0);
    const [isRun, setIsRun] = useState<boolean>(false);
    const [isFinish, setIsFinish] = useState<boolean>(false);

    const startInterval = () => {
        if (timer.current) {
            return;
        }

        timer.current = setInterval(runCountDown, 1000);
        setIsRun(true);
        setIsFinish(false);
    };

    const stopInterval = (_isFinish?: boolean) => {
        if (!timer.current) {
            return;
        }

        clearInterval(timer.current);
        timer.current = undefined;
        setIsRun(false);

        if (_isFinish) {
            setIsFinish(true);
        }
    };

    const runCountDown = () => {
        setTime((c_time) => {
            let new_time = c_time - 1;

            if (new_time <= 0) {
                stopInterval(true);
                new_time = 0;
            }

            return new_time;
        });
    };

    const initInterval = () => {
        if (countDownSecond <= 0) {
            return;
        }

        stopInterval();
        setTime(countDownSecond);
        startInterval();
    };

    const play = () => {
        if (time === 0) {
            return;
        }

        startInterval();
    };

    const pause = () => {
        stopInterval();
    };

    const stop = () => {
        stopInterval();
        setTime(0);
    };

    useEffectOnce(() => {
        initInterval();
    });

    useUpdateEffect(() => {
        initInterval();
    }, [countDownSecond]);

    useUnmount(() => {
        if (timer.current) {
            clearInterval(timer.current);
            timer.current = undefined;
        }
    });

    return { isRun, isFinish, time, play, pause, stop };
};

export default useCountDown;
