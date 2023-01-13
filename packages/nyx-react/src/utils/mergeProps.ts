import {Children, cloneElement, FC, isValidElement, ReactElement, ReactNode} from "react";

export default function mergeProps<PropType>(children: ReactNode, props: Partial<PropType>) {
    return Children.map(children, (child) => {
        if(isValidElement(child))
            return cloneElement(child, props);
    });
}

export function isComponent<S,T>(element: ReactElement<S>, referenceType: FC<T>): boolean {
    const {type: elementType} = element;

    if(typeof elementType === "string")
        return false;

    return "displayName" in elementType && elementType["displayName"] === referenceType.displayName;
}