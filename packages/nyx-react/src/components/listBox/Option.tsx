import {forwardRef, HTMLAttributes} from "react";

export interface IOption extends HTMLAttributes<HTMLLIElement>{
    selected?: boolean;
    name: string;
    value: never | null;
}

const Option = forwardRef<HTMLLIElement, IOption>(({children, name, value, selected, ...props}, ref) => {
    return <li {...props} ref={ref} tabIndex={-1} aria-label={name} aria-selected={selected} role={"option"}>
        {
            children
        }
    </li>;
});

Option.displayName = "ListBox.Option";

export default Option;