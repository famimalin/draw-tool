/*=====================================
    ResetInput 

    Author: Gray
    CreateTime: 2021 / 09 / 08
=====================================*/
import { HTMLProps, RefObject, useCallback } from "react";
import { supportsPassiveEvents } from "detect-it";
import { useRef } from "react";
import { useEffectOnce } from "react-use";

/*--------------------------

/*--------------------------
    Main 
--------------------------*/
type ResetInputProp = {
    inputRef?: RefObject<HTMLInputElement>;
    onTextChange?: (value: string) => void;
    onNumberChange?: (value: number | "") => void;
} & HTMLProps<HTMLInputElement>;

const ResetInput = (props: ResetInputProp) => {
    const {
        inputRef,
        style,
        value,
        onChange,
        onKeyDown,
        onTextChange,
        onNumberChange,
        type,
        ...otherProps
    } = props;

    const tempRef = useRef<HTMLInputElement>(null);
    const ref = inputRef ? inputRef : tempRef;

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
                onChange(event);
                return;
            }

            let value = event.target.value;

            if (onTextChange) {
                onTextChange(value);
            } else if (onNumberChange) {
                let n_value: number | "" = parseInt(value);

                if (isNaN(n_value)) {
                    n_value = "";
                }

                onNumberChange(n_value);
            }
        },
        [onChange, onTextChange, onNumberChange]
    );

    let _value = value;

    // 防錯誤訊息
    if (_value === undefined || _value === null) {
        _value = "";
    }

    useEffectOnce(() => {
        if (type === "number" && ref && ref.current) {
            if (supportsPassiveEvents) {
                ref.current.addEventListener(
                    "wheel",
                    (event) => {
                        event.preventDefault();
                    },
                    { passive: false }
                );
            } else {
                ref.current.addEventListener(
                    "wheel",
                    (event) => {
                        event.preventDefault();
                    },
                    false
                );
            }
        }
    });

    return (
        <input
            ref={ref}
            type={type}
            style={style}
            value={_value}
            onChange={handleChange}
            {...otherProps}
        />
    );
};

export default ResetInput;
export type { ResetInputProp };
