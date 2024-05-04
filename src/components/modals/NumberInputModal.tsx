/*=====================================
    NumberInputModal 

    Author: Gray
    CreateTime: 2024 / 05 / 04
=====================================*/
import styled, { css } from "styled-components";
import BaseModal from "./BaseModal";
import { Colors, GlobalStyle } from "../../stylecomponents";
import { RootDispatch, RootState } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { AppActions } from "../../redux/modules/appReducer";
import { useUpdateEffect } from "react-use";
import ResetForm from "../form/ResetForm";
import ResetInput from "../form/ResetInput";
import { useRef, useState } from "react";

/*--------------------------
    Styled
--------------------------*/
const Content = styled.div`
    width: 400px;
    padding: 30px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 20px 60px 0 rgba(0, 0, 0, 0.16);
`;
const Tilte = styled.div`
    color: ${Colors.Dark_500};
    font-size: 24px;
    font-weight: bold;

    ${GlobalStyle.getPhoneMedia(css`
        font-size: 18px;
    `)}
`;
const Desc = styled.div`
    line-height: 22px;
    margin: 16px 0 0 0;
    color: ${Colors.Dark_400};
    font-size: 16px;
`;
const FormWrapper = styled(ResetForm)`
    margin: 16px 0 0 0;
`;
const FomrInput = styled(ResetInput)`
    width: 100px;
    height: 44px;
    padding: 0 10px;
    border: 1px solid ${Colors.Dark_200};
    border-radius: 3px;
    color: ${Colors.Dark_500};
    font-size: 18px;
    text-align: center;

    &:focus {
        border: 1px solid ${Colors.Blue_400};
    }
`;
const ButtonGroup = styled.div`
    display: flex;
    margin: auto 0 0 0;
    padding: 30px 0 0 0;
    gap: 16px;
    justify-content: flex-end;
`;
const ConfirmButton = styled(GlobalStyle.BaseButton)`
    width: 80px;
    height: 36px;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    background-color: ${Colors.Blue};

    ${GlobalStyle.getPhoneMedia(css`
        padding: 0 30px;
        font-size: 16px;
    `)}
`;
const CancelButton = styled(GlobalStyle.BaseButton)`
    width: 80px;
    height: 36px;
    border-radius: 4px;
    color: ${Colors.Dark_500};
    font-size: 16px;
    background-color: ${Colors.Dark_200};

    ${GlobalStyle.getPhoneMedia(css`
        padding: 0 30px;
        font-size: 16px;
    `)}
`;

/*--------------------------
    Main 
--------------------------*/
type NumberInputModalProps = {};

const NumberInputModal = (props: NumberInputModalProps) => {
    const dispatch: RootDispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<number | "">("");

    const numberInputModal = useSelector((state: RootState) => state.app.numberInputModal);

    const { isOpen, title, desc, defaultValue, callback } = numberInputModal;

    const closeModal = () => {
        dispatch(AppActions.closeNumberInputModal());
    };

    const confirm = () => {
        if (!value) {
            return;
        }

        callback && callback(value);
        closeModal();
    };

    const init = () => {
        if (isOpen) {
            if (defaultValue === undefined) {
                setValue("");
            } else {
                setValue(defaultValue);
            }

            setTimeout(() => {
                inputRef.current?.select();
            }, 0);
        }
    };

    useUpdateEffect(() => {
        init();
    }, [isOpen]);

    return (
        <BaseModal isOpen={isOpen} closeMethod={closeModal}>
            <Content>
                <Tilte>{title}</Tilte>
                {desc && <Desc>{desc}</Desc>}

                <FormWrapper onSubmit={confirm}>
                    <FomrInput
                        type="number"
                        value={value}
                        onNumberChange={setValue}
                        inputRef={inputRef}
                    />
                </FormWrapper>

                <ButtonGroup>
                    <ConfirmButton onClick={confirm} disabled={!value}>
                        確定
                    </ConfirmButton>
                    <CancelButton onClick={closeModal}>取消</CancelButton>
                </ButtonGroup>
            </Content>
        </BaseModal>
    );
};

export default NumberInputModal;
