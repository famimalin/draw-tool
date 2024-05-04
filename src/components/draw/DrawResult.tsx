/*=====================================
    DrawResult 

    Author: Gray
    CreateTime: 2024 / 05 / 04
=====================================*/
import styled, { css } from "styled-components";
import { Colors } from "../../stylecomponents";
import useDrawUserList from "../../hooks/draw/useDrawUserList";
import DrawUserInfo from "../../types/data/draw/drawUserInfo.interface";
import { useMemo, useRef, useState } from "react";
import { useEffectOnce, useUnmount, useUpdateEffect } from "react-use";
import DrawUserListItem from "./DrawUserListItem";
import useWinnerDrawUser from "../../hooks/draw/useWinnerDrawUser";
import ConfettiExplosion from "../animation/ConfettiExplosion";

/*--------------------------
    Variables
--------------------------*/
const Speed = 100;
const ItemHeight = 50;
const PendingCount = 1;

/*--------------------------
    Styled
--------------------------*/
const Content = styled.div`
    width: 100%;
    max-width: 300px;
    height: ${ItemHeight}px;
    padding: 0 10px;
    border: 1px solid ${Colors.Dark_200};
    border-radius: 10px;
    overflow: hidden;
`;
const List = styled.div`
    position: relative;
    width: 100%;
    height: ${ItemHeight}px;
`;
const Item = styled.div<{ $isMonut: boolean }>`
    position: absolute;
    display: flex;
    left: 0;
    width: 100%;
    height: ${ItemHeight}px;
    transition: transform ${Speed}ms linear;

    ${(props) => {
        if (props.$isMonut) {
            return css`
                transform: translateY(-${ItemHeight * PendingCount}px);
            `;
        } else {
            return css`
                transform: none;
            `;
        }
    }}
`;
const EmptyItem = styled.div`
    display: flex;
    width: 100%;
    height: ${ItemHeight}px;
    color: ${Colors.Dark_500};
    font-size: 20px;
    align-items: center;
    justify-content: center;
`;
const ExplosionOrigin = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
`;

/*--------------------------
    Components
--------------------------*/
type FlyItemProps = {
    info: DrawUserInfo;
    index: number;
    isRunCountDown: boolean;
    offset?: number;
};
const FlyItem = (props: FlyItemProps) => {
    const { info, index, isRunCountDown, offset = 0 } = props;

    const [isMonut, setIsMonut] = useState<boolean>(false);

    const style = useMemo(() => {
        return {
            top: (index + offset) * ItemHeight,
        } as React.CSSProperties;
    }, [index, offset]);

    useEffectOnce(() => {
        requestAnimationFrame(() => {
            setIsMonut(true);
        });
    });

    return (
        <Item style={style} $isMonut={isRunCountDown && isMonut}>
            <DrawUserListItem info={info} />
        </Item>
    );
};

type DrawResultRunningProps = {
    list: DrawUserInfo[];
    isRunCountDown: boolean;
    isResetCountDown: boolean;
};
const DrawResultRunning = (props: DrawResultRunningProps) => {
    const { list, isRunCountDown, isResetCountDown } = props;

    const startIndex = useRef<number>(0);
    const timer = useRef<NodeJS.Timeout>();

    const [viewList, setViewList] = useState<DrawUserInfo[]>([]);
    const [pendingList, setPendingList] = useState<DrawUserInfo[]>([]);

    const startInterval = () => {
        if (timer.current) {
            return;
        }

        timer.current = setInterval(runLoop, Speed);
    };

    const stopInterval = () => {
        clearInterval(timer.current);
        timer.current = undefined;
    };

    const runLoop = () => {
        let start = startIndex.current;

        const total = list.length;
        const views: DrawUserInfo[] = [];
        const pendings: DrawUserInfo[] = [];

        for (let i = 0; i < PendingCount; i++) {
            views.push(list[start]);
            start++;
            start %= total;
        }

        for (let i = 0; i < PendingCount; i++) {
            pendings.push(list[start]);
            start++;
            start %= total;
        }

        startIndex.current += PendingCount;
        startIndex.current %= total;

        setViewList(views);
        setPendingList(pendings);
    };

    useEffectOnce(() => {
        if (isRunCountDown) {
            startInterval();
        }
    });

    useUnmount(() => {
        if (timer.current) {
            clearInterval(timer.current);
            timer.current = undefined;
        }
    });

    useUpdateEffect(() => {
        if (isRunCountDown) {
            startInterval();
        } else {
            stopInterval();
        }
    }, [isRunCountDown]);

    useUpdateEffect(() => {
        if (isResetCountDown) {
            setViewList([]);
            setPendingList([]);
        }
    }, [isResetCountDown]);

    return (
        <Content>
            {viewList.length > 0 ? (
                <List>
                    {viewList.map((info, index) => {
                        return (
                            <FlyItem
                                key={info.id}
                                info={info}
                                index={index}
                                isRunCountDown={isRunCountDown}
                            />
                        );
                    })}
                    {pendingList.map((info, index) => {
                        return (
                            <FlyItem
                                key={info.id}
                                info={info}
                                index={index}
                                isRunCountDown={isRunCountDown}
                                offset={PendingCount}
                            />
                        );
                    })}
                </List>
            ) : (
                <List>
                    <EmptyItem>- - - - -</EmptyItem>
                </List>
            )}
        </Content>
    );
};

type DrawResultWinnerProps = {
    winner: DrawUserInfo;
};
const DrawResultWinner = (props: DrawResultWinnerProps) => {
    const { winner } = props;

    return (
        <Content>
            <List>
                <DrawUserListItem info={winner} />
                <ExplosionOrigin>
                    <ConfettiExplosion />
                </ExplosionOrigin>
            </List>
        </Content>
    );
};

/*--------------------------
    Main 
--------------------------*/
type DrawResultProps = {
    isRunCountDown: boolean;
    isResetCountDown: boolean;
};

const DrawResult = (props: DrawResultProps) => {
    const { isRunCountDown, isResetCountDown } = props;
    const winner = useWinnerDrawUser();
    const { dataList } = useDrawUserList();

    const reSortList = useMemo(() => {
        return [...dataList].sort(() => Math.random() * 2 - 1);
    }, [dataList]);

    if (winner) {
        return <DrawResultWinner winner={winner} />;
    } else {
        return (
            <DrawResultRunning
                list={reSortList}
                isRunCountDown={isRunCountDown}
                isResetCountDown={isResetCountDown}
            />
        );
    }
};

export default DrawResult;
