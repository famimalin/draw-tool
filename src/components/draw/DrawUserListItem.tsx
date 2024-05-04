/*=====================================
    DrawUserListItem 

    Author: Gray
    CreateTime: 2024 / 05 / 03
=====================================*/
import styled, { css } from "styled-components";
import Gender from "../../types/common/gender.enum";
import { Colors } from "../../stylecomponents";
import { IoMale, IoFemale, IoMaleFemale } from "react-icons/io5";
import DrawUserInfo from "../../types/data/draw/drawUserInfo.interface";
import { useCallback } from "react";

/*--------------------------
    Styled
--------------------------*/
const Content = styled.div<{ $isWinner?: boolean }>`
    display: flex;
    width: 100%;
    height: 50px;
    padding: 0 10px 0 0;
    border-bottom: 1px solid ${Colors.Dark_200};
    color: ${Colors.Dark_500};
    font-size: 16px;
    align-items: center;
    background-color: ${(props) =>
        props.$isWinner ? Colors.hexToRgba(Colors.Green_100, 0.7) : "#fff"};

    &:last-child {
        border-bottom: none;
    }
`;
const Icon = styled.div<{ $gender: Gender }>`
    display: flex;
    width: 50px;
    height: 50px;
    font-size: 22px;
    align-items: center;
    justify-content: center;

    ${(props) => {
        switch (props.$gender) {
            case Gender.Unknow:
                return ``;
            case Gender.Male:
                return css`
                    color: ${Colors.Blue};
                `;
            case Gender.Female:
                return css`
                    color: ${Colors.Red};
                `;
            default:
                return css`
                    color: ${Colors.Dark_500};
                `;
        }
    }}
`;
const Age = styled.div`
    margin: 0 0 0 auto;
    color: ${Colors.Dark_300};
    font-size: 15px;
`;

/*--------------------------
    Main 
--------------------------*/
type DrawUserListItemProps = {
    info: DrawUserInfo;
    isWinner?: boolean;
};

const DrawUserListItem = (props: DrawUserListItemProps) => {
    const { info, isWinner } = props;

    const { gender, name, age } = info;

    const renderGenderIcon = useCallback(() => {
        switch (gender) {
            case Gender.Male:
                return <IoMale />;
            case Gender.Female:
                return <IoFemale />;
            case Gender.Unknow:
            default:
                return <IoMaleFemale />;
        }
    }, [gender]);

    return (
        <Content $isWinner={isWinner}>
            <Icon $gender={gender}>{renderGenderIcon()}</Icon>
            {name}
            <Age>{age} 歲</Age>
        </Content>
    );
};

export default DrawUserListItem;
