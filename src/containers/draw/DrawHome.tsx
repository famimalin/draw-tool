/*=====================================
    Home 

    Author: Gray
    CreateTime: 2024 / 05 / 03
=====================================*/
import styled from "styled-components";
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
    padding: 0 40px 0 0;
    flex: 1;
`;
const ListWrapper = styled.div`
    width: 300px;
    min-width: 300px;
`;
const Title = styled.h1`
    margin: 0;
    color: ${Colors.Dark_500};
    font-size: 36px;
`;
const SubTitle = styled.h4`
    margin: 20px 0 0 0;
    color: ${Colors.Dark_500};
    font-size: 20px;
`;
const FormWrapper = styled(ResetForm)`
    display: flex;
    margin: 20px 0 0 0;
    align-items: center;
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
`;
const Unit = styled.div`
    margin: 0 0 0 10px;
    color: ${Colors.Dark_500};
    font-size: 16px;
`;
const SubmitButton = styled(GlobalStyle.BaseButton)`
    height: 40px;
    margin: 0 0 0 40px;
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
        if (countDownTime === 0) {
            return;
        }
        stopCountDown();
        setIsResetCountDown(true);
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
                            <CountDownButton
                                onClick={resetCountDown}
                                disabled={countDownTime === 0}
                            >
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
                    <DrawUserList />
                </ListWrapper>
            </Content>
        </Body>
    );
};

export default DrawHome;
