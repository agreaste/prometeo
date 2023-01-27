import {
    FocusEventHandler, HTMLAttributes, KeyboardEventHandler, useEffect,
    useReducer,
} from "react";
import Button from "./Button";
import ListBox from "./ListBox";
import Option from "./Option";
import {
    comboBoxReducer,
    ComboBoxContext,
    ComboBoxDispatchContext,
    ComboBoxSlice,
    initialComboBoxState
} from "./context";

export interface ComboBoxProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    onChange: (value: unknown) => void;
}

let ComboBox = ({children, onChange, ...props}: ComboBoxProps) => {
    const [state, dispatch] = useReducer(comboBoxReducer, initialComboBoxState);

    useEffect(() => {
        onChange(state.selectedOption(state)?.value);
    }, [state.selected]);

    const blurHandler: FocusEventHandler = ({relatedTarget, currentTarget}) => {
        if (state.expanded && !currentTarget.contains(relatedTarget))
            dispatch({type: "popup/close"});
    };

    const keyHandler: KeyboardEventHandler = (event) => {
        if(["ArrowUp", "ArrowDown"].includes(event.key)) {
            event.preventDefault();
        }
    };

    return <ComboBoxContext.Provider value={state as ComboBoxSlice<unknown>}>
        <ComboBoxDispatchContext.Provider value={dispatch}>
            <div {...props} onBlur={blurHandler} onKeyDown={keyHandler}>
                {children}
            </div>
        </ComboBoxDispatchContext.Provider>
    </ComboBoxContext.Provider>;
};

export default ComboBox = Object.assign(ComboBox, {Option, Button, asListBox: ListBox});