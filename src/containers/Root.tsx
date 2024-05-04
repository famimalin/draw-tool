/*=====================================
    Root 

    Author: Gray
    CreateTime: 2024 / 05 / 03
=====================================*/
import RootFiexdContents from "./RootFiexdContents";
import DrawHome from "./draw/DrawHome";

/*--------------------------
    Main 
--------------------------*/
type RootProps = {};

const Root = (props: RootProps) => {
    return (
        <>
            <DrawHome />

            <RootFiexdContents />
        </>
    );
};

export default Root;
