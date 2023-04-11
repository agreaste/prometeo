import {HTMLAttributes, memo, ReactElement, useContext, useEffect, useMemo} from "react";
import {ComboBoxContext, ComboBoxDispatchContext, IOption} from "./context";

type OmittedProps = "aria-label" | "id" | "role" | "aria-selected" | "onmouseover";

export interface OptionProps<T = string> extends Omit<IOption<T>, "label" | "content">, Omit<HTMLAttributes<HTMLLIElement>, OmittedProps> {
    "aria-label": string;
}

export interface OptionComponent<T = string> {
    (props: OptionProps<T>, context: unknown): ReactElement | null;
    displayName?: string | undefined;
}

const Option: OptionComponent<unknown> = <T extends unknown = string>({id, "aria-label": label, value, children, ...props}: OptionProps<T>) => {
    const dispatch = useContext(ComboBoxDispatchContext);
    const {options, active, selected} = useContext(ComboBoxContext);

    useEffect(() => {
        if (!options.some((option) => option.id === id))
            dispatch({
                type: "option/register",
                payload: {
                    id,
                    label,
                    value,
                    content: children
                }
            });

        return () => {
            dispatch({
                type: "option/unregister",
                payload: {
                    id,
                    label,
                    value,
                    content: children
                }
            });
        };
    }, []);

    const hoverCallback = () => {
        dispatch({
            type: "option/activate",
            payload: id
        });
    };

    const style = useMemo(() => (id === active ? {outline: "5px auto -webkit-focus-ring-color"} : undefined), [active]);

    return <li {...props} id={id} aria-label={label} aria-selected={id === selected} role={"option"} style={style} onMouseOver={hoverCallback}>
        {children}
    </li>;
};

Option.displayName = "Option";

export default Option;