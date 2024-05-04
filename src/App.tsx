/*=====================================
    App 

    Author: Gray
    CreateTime: 2024 / 05 / 03
=====================================*/
import Root from "./containers/Root";
import { Provider } from "react-redux";
import { StyleSheetManager } from "styled-components";
import rootStore from "./redux/configureStore";
import "./App.css";

/*--------------------------
    Main 
--------------------------*/
type AppProps = {};

const App = (props: AppProps) => {
    return (
        <Provider store={rootStore}>
            <StyleSheetManager enableVendorPrefixes>
                <Root />
            </StyleSheetManager>
        </Provider>
    );
};

export default App;
