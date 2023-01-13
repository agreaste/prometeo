import {HTMLAttributes, PropsWithChildren} from "react";
import mergeProps from "../../utils/mergeProps";

export interface ICheckbox {
    name: string;
    checked: boolean;
}

const Checkbox = ({children, name, checked, ...props}: PropsWithChildren<ICheckbox>) => {
    return <>
        {mergeProps<HTMLAttributes<HTMLElement>>(children, {
            ...props,
            "aria-label": name,
            "aria-checked": checked,
            role: "checkbox",
            tabIndex: 0
        })}
    </>;
};

export default Checkbox;