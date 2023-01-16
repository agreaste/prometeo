import {forwardRef, HTMLAttributes} from "react";

export interface IOption extends Omit<HTMLAttributes<HTMLLIElement>, "aria-label">{
    selected?: boolean;
    value: never | null;
    "aria-label": string;
}

const Option = forwardRef<HTMLLIElement, IOption>(({children, value, selected, ...props}, ref) => {
    return <li {...props} ref={ref} tabIndex={-1} aria-selected={selected} role={"option"}>
        {
            children
        }
    </li>;
});

Option.displayName = "ListBox.Option";

export default Option;