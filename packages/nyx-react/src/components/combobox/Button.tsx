import {FC, HTMLAttributes, KeyboardEvent, memo, useContext} from "react";
import {ComboBoxContext, ComboBoxDispatchContext} from "./context";

let Button: FC<HTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => {
    const dispatch = useContext(ComboBoxDispatchContext);
    const state = useContext(ComboBoxContext);
    const {active, expanded, popupType, popupId, options} = state;

    const clickCallback = () => {
        if (!expanded)
            dispatch({type: "popup/open"});
        else {
            if (active)
                dispatch({type: "option/select", payload: active});
        }
    };

    const keyupCallback = (event: KeyboardEvent<Element>) => {
        if(!expanded)
            return;

        const currentIndex = options.findIndex(({id}) => id === active);
        const nextIndex = Math.min(currentIndex + 1, options.length - 1);
        const prevIndex = Math.max(currentIndex - 1, 0);
        switch (event.key) {
            case "Escape":
                if (expanded) {
                    dispatch({type: "popup/close"});
                }
                break;
            case "ArrowDown":

                dispatch({
                    type: "option/activate",
                    payload: options[nextIndex].id
                });
                break;
            case "ArrowUp":
                dispatch({
                    type: "option/activate",
                    payload: options[prevIndex].id
                });
                break;
        }
    };

    return <button {...props} role={"combobox"} aria-haspopup={popupType} aria-controls={popupId} aria-activedescendant={active} aria-expanded={expanded} onKeyUp={keyupCallback} onClick={clickCallback}>
        {state.selectedContent(state) ?? children}
    </button>;
};

Button.displayName = "ComboBox.Button";

export default Button = memo(Button);