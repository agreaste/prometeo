import {Children, cloneElement, isValidElement, ReactNode} from "react";

export default function mergeProps<PropType>(children: ReactNode, props: Partial<PropType>) {
    return Children.map(children, (child) => {
        if(isValidElement(child))
            return cloneElement(child, props);
    });
}