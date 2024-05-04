/*=====================================
    ConfettiExplosion 

    Author: Gray
    CreateTime: 2024 / 05 / 04
=====================================*/
import confetti from "canvas-confetti";
import { cumulativeOffset } from "../../utils/globalUtil";
import { useRef } from "react";
import { useEffectOnce } from "react-use";

/*--------------------------
    Main 
--------------------------*/
type ConfettiExplosionProps = {};

const ConfettiExplosion = (props: ConfettiExplosionProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffectOnce(() => {
        const origin = {
            x: 0.5,
            y: 0.5,
        };

        const clientWidth = document.body.clientWidth;
        const clientHeight = document.body.clientHeight;

        if (ref.current) {
            const offset = cumulativeOffset(ref.current);

            if (offset?.left && clientWidth) {
                origin.x = offset.left / clientWidth;
            }

            if (offset?.top && clientHeight) {
                // 多 50 讓彩帶發射點靠下面一點
                origin.y = (offset.top + 50) / clientHeight;
            }
        }

        confetti({
            particleCount: 100,
            spread: 70,
            origin: origin,
        });
    });

    return <div ref={ref}></div>;
};

export default ConfettiExplosion;
