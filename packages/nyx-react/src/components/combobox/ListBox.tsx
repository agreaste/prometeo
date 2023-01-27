import {HTMLAttributes, memo, useContext, useEffect} from "react";
import {ComboBoxContext, ComboBoxDispatchContext} from "./context";

export interface ListBoxProps extends Omit<HTMLAttributes<HTMLUListElement>, "id"> {
    id: string;
}

let ListBox = ({id, children, ...props}: ListBoxProps) => {
    const dispatch = useContext(ComboBoxDispatchContext);
    const {active, expanded} = useContext(ComboBoxContext);

    useEffect(() => {
        dispatch({
            type: "popup/register",
            payload: {
                popup: "listbox",
                id
            }
        });
    }, []);

    const clickCallback = () => {
        dispatch({
            type: "option/select",
            payload: active as string
        });
    };

    return expanded ? <ul tabIndex={-1} {...props} id={id} role={"listbox"} onClick={clickCallback}>
        {children}
    </ul> : null;
};

export default ListBox = memo(ListBox);