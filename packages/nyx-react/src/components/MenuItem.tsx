import {forwardRef, PropsWithChildren} from "react";
import mergeProps from "../utils/mergeProps";

const MenuItem = forwardRef<any, PropsWithChildren<any>>(({children, ...props}, ref) => {
    return <>
        {mergeProps(children, {
            ...props,
            ref,
            role: "menuitem",
        })}
    </>;
});

export default MenuItem;