/*=====================================
    ResetForm 

    Author: Gray
    CreateTime: 2021 / 09 / 28
=====================================*/
import { HTMLProps } from "react";
import styled from "styled-components";

/*--------------------------
    Style
--------------------------*/
const HiddenButton = styled.button`
    display: none;
`;

/*--------------------------
    Main 
--------------------------*/
type ResetFormProp = {} & HTMLProps<HTMLFormElement>;

const ResetForm = (props: ResetFormProp) => {
    const { onSubmit, children, ...rest } = props;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit && onSubmit(event);
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off" {...rest}>
            {children}
            <HiddenButton type="submit" />
        </form>
    );
};

export default ResetForm;
