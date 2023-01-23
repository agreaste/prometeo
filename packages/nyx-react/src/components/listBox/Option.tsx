import {forwardRef, HTMLAttributes, ReactElement, RefAttributes} from "react";

export interface IOption<T = string> extends Omit<HTMLAttributes<HTMLLIElement>, "aria-label">{
    selected?: boolean;
    value: T;
    "aria-label": string;
}

const Option = forwardRef<HTMLLIElement, IOption>(({children, value, selected, ...props}, ref) => {
    return <li {...props} ref={ref} tabIndex={-1} aria-selected={selected} role={"option"} data-value={value}>
        {
            children
        }
    </li>;
});

Option.displayName = "ListBox.Option";

export default Option as <T = string>(p: IOption<T> & RefAttributes<HTMLLIElement>) => ReactElement;