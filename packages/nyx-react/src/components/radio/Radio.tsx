import {forwardRef, HTMLAttributes, PropsWithChildren, RefAttributes} from "react";
import mergeProps from "../../utils/mergeProps";

export interface IRadio extends HTMLAttributes<HTMLElement>{
    name: string;
    value: never;
    selected?: boolean;
}

const Radio = forwardRef<HTMLElement, IRadio>(({children, name, selected, ...props}, ref) => {
    return <>
        {mergeProps<HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>>(children, {
            ...props,
            ref,
            "aria-label": name,
            "aria-checked": selected,
            role: "radio",
        })}
    </>;
});

Radio.displayName = "RadioButton";

export default Radio;