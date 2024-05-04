/*=====================================
    DrawUserList 

    Author: Gray
    CreateTime: 2024 / 05 / 03
=====================================*/
import styled, { css } from "styled-components";
import useDrawUserList from "../../hooks/draw/useDrawUserList";
import { Colors, GlobalStyle } from "../../stylecomponents";
import DrawUserListItem from "./DrawUserListItem";
import { IoRefresh } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import { AppActions } from "../../redux/modules/appReducer";
import { pureTimeout } from "../../utils/globalUtil";
import { DrawActions } from "../../redux/modules/drawReducer";

/*--------------------------
    Styled
--------------------------*/
const Content = styled.div`
    position: relative;
    width: 100%;
`;
const Title = styled.h4`
    display: flex;
    height: 60px;
    margin: 0;
    color: ${Colors.Dark_500};
    font-size: 20px;
    align-items: center;

    ${GlobalStyle.getPhoneMedia(css`
        padding: 0 0 0 20px;
    `)}
`;
const RefreshButton = styled(GlobalStyle.BaseButton)`
    display: flex;
    width: 40px;
    height: 40px;
    margin: 0 0 0 auto;
    color: ${Colors.Dark_500};
    font-size: 20px;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;
const List = styled.div`
    min-height: 200px;
    max-height: calc(100vh - 260px);
    padding: 0 10px;
    border: 1px solid ${Colors.Dark_200};
    border-radius: 10px;
    overflow: auto;
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.08);

    ${GlobalStyle.getPhoneMedia(css`
        border: none;
        max-height: calc(100vh - 80px);
        box-shadow: none;
    `)}
`;

/*--------------------------
    Main 
--------------------------*/
type DrawUserListProps = {};

const DrawUserList = (props: DrawUserListProps) => {
    const dispatch = useDispatch();
    const { dataList } = useDrawUserList();
    const winnerUserId = useSelector((state: RootState) => state.draw.winnerUserId);

    const onRefreshClick = () => {
        dispatch(
            AppActions.openNumberInputModal({
                title: "重設抽獎名單",
                desc: "請設定抽獎總人數",
                defaultValue: dataList.length,
                callback: async (value: number) => {
                    await dispatch(DrawActions.clearDrawUserList());
                    await dispatch(DrawActions.clearWinnerDrawUser());
                    await pureTimeout(300);
                    await dispatch(DrawActions.generateDrawUserList({ total: value }));
                },
            })
        );
    };

    return (
        <Content>
            <Title>
                抽獎名單 ({dataList.length})
                <RefreshButton onClick={onRefreshClick}>
                    <IoRefresh />
                </RefreshButton>
            </Title>
            <List>
                {dataList.map((item) => {
                    return (
                        <DrawUserListItem
                            key={item.id}
                            info={item}
                            isWinner={winnerUserId === item.id}
                        />
                    );
                })}
            </List>
        </Content>
    );
};

export default DrawUserList;
