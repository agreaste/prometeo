import {FC, ReactElement, useMemo} from "react";
import mergeProps, {isComponent} from "../utils/mergeProps";

const useExtractComponent = <S, T>(children: ReactElement<S>[], cType: FC<T>, props: Partial<T>) => useMemo(() => {
    return mergeProps<T>(children.flat().find(item => isComponent(item, cType)), props);
}, [children]);

export const useExtractComponents = <S, T>(children: ReactElement<S>[], cType: FC<T>, mergeFunction: (value: ReactElement<S>, i: number) => Partial<T> = () => ({})) => useMemo(() => {
    return children.flat()
        .filter(item => isComponent(item, cType))
        .map((child, i) => mergeProps(child, mergeFunction(child, i)));
}, [children]);

export default useExtractComponent;