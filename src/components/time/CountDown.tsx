/*=====================================
    CountDown 

    Author: Gray
    CreateTime: 2024 / 05 / 03
=====================================*/
import styled from "styled-components";
import { Colors } from "../../stylecomponents";
import { useMemo } from "react";

/*--------------------------
    Styled
--------------------------*/
const Content = styled.div`
    display: flex;
    color: ${Colors.Dark_500};
    align-items: center;
`;
const NumberText = styled.div`
    font-size: 50px;
`;
const Colon = styled.div`
    position: relative;
    width: 4px;
    height: 16px;
    margin: 0 8px;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: ${Colors.Dark_500};
    }

    &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: ${Colors.Dark_500};
    }
`;

/*--------------------------
    Main 
--------------------------*/
type CountDownProps = {
    second: number;
};

const CountDown = (props: CountDownProps) => {
    const { second } = props;

    const [minuteText, secondText] = useMemo(() => {
        const min = Math.floor(second / 60);
        const sec = second % 60;

        return [min.toString().padStart(2, "0"), sec.toString().padStart(2, "0")];
    }, [second]);

    return (
        <Content>
            <NumberText>{minuteText}</NumberText>
            <Colon />
            <NumberText>{secondText}</NumberText>
        </Content>
    );
};

export default CountDown;
