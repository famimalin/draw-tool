/*=====================================
    Home 

    Author: Gray
    CreateTime: 2024 / 05 / 03
=====================================*/
import styled, { css } from "styled-components";
import { Colors, GlobalStyle } from "../../stylecomponents";
import DrawUserList from "../../components/draw/DrawUserList";
import { useMemo, useState } from "react";
import ResetForm from "../../components/form/ResetForm";
import ResetInput from "../../components/form/ResetInput";
import useCountDown from "../../hooks/time/useCountDown";
import { useUpdateEffect } from "react-use";
import CountDown from "../../components/time/CountDown";
import { IoPlaySharp, IoPauseSharp, IoClose } from "react-icons/io5";
import DrawResult from "../../components/draw/DrawResult";
import { useDispatch } from "react-redux";
import { DrawActions } from "../../redux/modules/drawReducer";
import { IoPeopleSharp } from "react-icons/io5";

/*--------------------------
    Styled
--------------------------*/
const Body = styled.div`
    min-height: 100vh;
    padding: 40px 0;
`;
const Content = styled.div`
    display: flex;
    width: calc(100% - 40px);
    max-width: 1200px;
    margin: 0 auto;
`;
const ControlWrapper = styled.div`
    min-width: 0;
    padding: 0 20px 0 0;
    flex: 1;

    ${GlobalStyle.getPhoneMedia(css`
        padding: 0;
    `)}
`;
const ListWrapper = styled.div`
    width: 300px;
    min-width: 300px;

    ${GlobalStyle.getPhoneMedia(css`
        width: 0;
        min-width: 0;
    `)}
`;
const ListOverlay = styled.div<{ $isShow?: boolean }>`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
    z-index: 1;

    ${GlobalStyle.getPhoneMedia(css`
        display: block;
    `)}

    ${(props) => {
        if (props.$isShow) {
            return css`
                visibility: visible;
                opacity: 1;
            `;
        } else {
            return css`
                visibility: hidden;
                opacity: 0;
            `;
        }
    }}
`;
const ListContent = styled.div<{ $isShow?: boolean }>`
    position: fixed;
    top: 70px;
    width: 300px;
    z-index: 2;

    ${GlobalStyle.getPhoneMedia(css`
        top: 0;
        right: 0;
        height: 100%;
        border-left: 1px solid #eee;
        background-color: #fff;
        box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.08);
        transition: all 0.3s;
    `)}

    ${(props) => {
        if (props.$isShow) {
            return css`
                ${GlobalStyle.getPhoneMedia(css`
                    transform: none;
                `)}
            `;
        } else {
            return css`
                ${GlobalStyle.getPhoneMedia(css`
                    transform: translateX(300px);
                `)}
            `;
        }
    }}
`;
const ListToggle = styled.div`
    display: none;
    position: absolute;
    top: 40px;
    left: -40px;
    width: 40px;
    height: 50px;
    border: 1px solid #eee;
    border-right: none;
    border-radius: 5px 0 0 5px;
    color: ${Colors.Dark_500};
    font-size: 24px;
    background-color: #fff;
    box-shadow: -2px 2px 0px 0px rgba(0, 0, 0, 0.08);
    cursor: pointer;

    ${GlobalStyle.getPhoneMedia(css`
        display: flex;
        align-items: center;
        justify-content: center;
    `)}
`;
const Title = styled.h1`
    margin: 0;
    color: ${Colors.Dark_500};
    font-size: 36px;

    ${GlobalStyle.getPhoneMedia(css`
        text-align: center;
    `)}
`;
const SubTitle = styled.h4`
    margin: 20px 0 0 0;
    color: ${Colors.Dark_500};
    font-size: 20px;

    ${GlobalStyle.getPhoneMedia(css`
        text-align: center;
    `)}
`;
const FormWrapper = styled(ResetForm)`
    display: flex;
    margin: 20px 0 0 0;
    align-items: center;

    ${GlobalStyle.getTabletMedia(css`
        flex-wrap: wrap;
    `)}

    ${GlobalStyle.getPhoneMedia(css`
        justify-content: center;
        flex-wrap: wrap;
    `)}
`;
const Input = styled(ResetInput)`
    width: 80px;
    height: 40px;
    padding: 0 10px;
    border: 1px solid ${Colors.Dark_200};
    border-radius: 3px;
    color: ${Colors.Dark_500};
    font-size: 16px;

    &:focus {
        border: 1px solid ${Colors.Blue_400};
    }

    ${GlobalStyle.getTabletMedia(css`
        width: 70px;
    `)}

    ${GlobalStyle.getPhoneMedia(css`
        width: 70px;
    `)}
`;
const Unit = styled.div`
    margin: 0 0 0 10px;
    color: ${Colors.Dark_500};
    font-size: 16px;
`;
const SubmitButton = styled(GlobalStyle.BaseButton)`
    height: 40px;
    margin: 0 0 0 20px;
    padding: 0 20px;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    background-color: ${Colors.Blue};
`;
const CountDownWrapper = styled.div`
    display: flex;
    margin: 0 0 0 auto;
    gap: 20px;
    align-items: center;

    ${GlobalStyle.getTabletMedia(css`
        width: 100%;
        margin: 20px 0 0 0;
    `)}

    ${GlobalStyle.getPhoneMedia(css`
        width: 100%;
        margin: 20px 0 0 0;
        justify-content: center;
    `)}
`;
const CountDownButton = styled(GlobalStyle.BaseButton)`
    width: 40px;
    height: 40px;
    border: 1px solid ${Colors.Dark_300};
    border-radius: 5px;
    color: ${Colors.Dark_500};
    font-size: 20px;
    background-color: ${Colors.Dark_100};
`;
const ResultWrapper = styled.div`
    display: flex;
    margin: 60px 0 0 0;
    align-items: center;
    flex-direction: column;
    gap: 30px;
`;
const ResultTitle = styled.div`
    text-align: center;
    color: ${Colors.Red};
    font-size: 24px;
    font-weight: bold;
`;

/*--------------------------
    Main 
--------------------------*/
type DrawHomeProps = {};

const DrawHome = (props: DrawHomeProps) => {
    const dispatch = useDispatch();
    const [second, setSecond] = useState<number | "">("");
    const [startSecond, setStartSecond] = useState<number>(0);
    const [isResetCountDown, setIsResetCountDown] = useState<boolean>(false);
    const [isOpenList, setIsOpenList] = useState<boolean>(false);

    const {
        time: countDownTime,
        isRun: isRunCountDown,
        isFinish: isFinishCountDown,
        play: playCountDown,
        pause: pauseCountDown,
        stop: stopCountDown,
    } = useCountDown({
        countDownSecond: startSecond,
    });

    const disableSubmit = useMemo(() => {
        return !second || second <= 0 || countDownTime > 0;
    }, [second, countDownTime]);

    const startCountDown = () => {
        if (!second || second <= 0) {
            return;
        }

        if (countDownTime > 0) {
            return;
        }

        setStartSecond(second);
        setSecond("");
        setIsResetCountDown(false);
        dispatch(DrawActions.clearWinnerDrawUser());
    };

    const resetCountDown = () => {
        if (countDownTime > 0) {
            stopCountDown();
        }

        setIsResetCountDown(true);
        dispatch(DrawActions.clearWinnerDrawUser());
    };

    const toggleList = () => {
        setIsOpenList((_isOpen) => !_isOpen);
    };

    useUpdateEffect(() => {
        if (countDownTime === 0) {
            setStartSecond(0);
        }
    }, [countDownTime]);

    useUpdateEffect(() => {
        if (isFinishCountDown) {
            dispatch(DrawActions.generateWinnerDrawUser());
        }
    }, [isFinishCountDown]);

    return (
        <Body>
            <Content>
                <ControlWrapper>
                    <Title>抽獎遊戲</Title>
                    <SubTitle>抽獎設定</SubTitle>
                    <FormWrapper disabled={disableSubmit} onSubmit={startCountDown}>
                        <Input type="number" value={second} onNumberChange={setSecond} />
                        <Unit>秒鐘</Unit>
                        <SubmitButton disabled={disableSubmit} onClick={startCountDown}>
                            開始抽獎
                        </SubmitButton>
                        <CountDownWrapper>
                            <CountDown second={countDownTime} />
                            {isRunCountDown ? (
                                <CountDownButton
                                    onClick={pauseCountDown}
                                    disabled={countDownTime === 0}
                                >
                                    <IoPauseSharp />
                                </CountDownButton>
                            ) : (
                                <CountDownButton
                                    onClick={playCountDown}
                                    disabled={countDownTime === 0}
                                >
                                    <IoPlaySharp />
                                </CountDownButton>
                            )}
                            <CountDownButton onClick={resetCountDown}>
                                <IoClose />
                            </CountDownButton>
                        </CountDownWrapper>
                    </FormWrapper>
                    <ResultWrapper>
                        <ResultTitle>得獎結果</ResultTitle>
                        <DrawResult
                            isRunCountDown={isRunCountDown}
                            isResetCountDown={isResetCountDown}
                        />
                    </ResultWrapper>
                </ControlWrapper>
                <ListWrapper>
                    <ListOverlay $isShow={isOpenList} onClick={toggleList} />
                    <ListContent $isShow={isOpenList}>
                        <ListToggle onClick={toggleList}>
                            <IoPeopleSharp />
                        </ListToggle>
                        <DrawUserList />
                    </ListContent>
                </ListWrapper>
            </Content>
        </Body>
    );
};

export default DrawHome;
