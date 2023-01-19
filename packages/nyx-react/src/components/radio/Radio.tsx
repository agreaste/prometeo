import {
    Children,
    createElement,
    ElementType,
    forwardRef,
    HTMLAttributes,
    PropsWithChildren,
    ReactElement,
    RefAttributes
} from "react";
import mergeProps from "../../utils/mergeProps";

export interface IRadio<T = string> extends Omit<HTMLAttributes<HTMLElement>, "aria-label" | "aria-labelledby">{
    "aria-label": string;
    value: T;
    selected?: boolean;
    as?: ElementType;
}

const Radio = forwardRef<HTMLElement, IRadio>(({children, selected = false, as = "div", ...props}, ref) => {
    return createElement(as, {
        ...props,
        ref,
        "aria-checked": selected,
        role: "radio",
    }, children);
});

Radio.displayName = "RadioButton";

export default Radio as <T = string>(p: IRadio<T> & RefAttributes<HTMLElement>) => ReactElement;