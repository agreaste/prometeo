import {
    useEffect,
    useRef,
    useCallback,
    useState,
    KeyboardEvent,
    HTMLAttributes, ReactElement, RefAttributes, RefObject, forwardRef, KeyboardEventHandler, useMemo, memo
} from "react";
import useArrowNav from "../../hooks/useArrowNav";
import mergeProps, {isComponent} from "../../utils/mergeProps";
import Option, {IOption} from "./Option";
import {FormComponent} from "../../utils/FormComponent";

export interface ListBoxProps<T = string> extends Omit<HTMLAttributes<HTMLUListElement>, "children"> {
    label: string | RefObject<HTMLElement>;
    placeholder?: string;
    listWrapClassName?: string;
    children: ReactElement<IOption<T>>[];
}

export type IListBox<T = string> = FormComponent<ListBoxProps, T>;

let ListBox = forwardRef<HTMLUListElement, IListBox>(({
    label,
    className,
    children,
    onChange,
    ...props
}: IListBox, ref) => {

    const idPrefix = useRef(Math.random());

    const [selected, setSelected] = useState<number | null>(null);
    const items = children.flat().filter((child) => isComponent(child, Option)) as ReactElement<IOption>[];
    const values = useMemo(() => children.flat().filter((child) => isComponent(child, Option)).map((option) => (option as ReactElement<IOption>).props.value), [children]);

    const [refs, handler, active] = useArrowNav<HTMLLIElement>(items.length, "vertical");

    const id = useCallback((index: number) => idPrefix.current + "__option__" + index, [idPrefix]);

    useEffect(() => {
        if (refs[active])
            refs[active].current?.focus();
    }, [active, refs]);

    useEffect(() => {
        if (selected !== null)
            onChange(values[selected]);
        else {
            onChange(null);
        }
    }, [selected]);

    const clickHandler = (i: number | null) => {
        setSelected(i);
    };

    const keydownHandler = useCallback((event: KeyboardEvent<Element>, i: number | null) => {
        switch (event.key) {
            case " ":
            case "Enter":
                setSelected(i);
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }, [setSelected]);

    const labelling = (typeof label === "string"
        ? {"aria-label": label}
        : {"aria-labelledby": label.current?.id});

    const keyDownHandler: KeyboardEventHandler = (event) => {
        switch (event.key) {
            case "ArrowUp":
                if(active > 0)
                    event.stopPropagation();
            case "ArrowDown":
                event.preventDefault();
                break;
        }

        handler(event);
    };

    return (<ul {...props} ref={ref} role="listbox" {...labelling} className={className} tabIndex={-1} onKeyDown={keyDownHandler}>
        {
            items && items.map((el: ReactElement<IOption>, i: number) => mergeProps<IOption & RefAttributes<HTMLElement>>(el, {
                key: i,
                ref: refs[i],
                selected: i === selected,
                id: id(i),
                onKeyDownCapture: (event: KeyboardEvent<Element>) => keydownHandler(event, i),
                onClick: () => clickHandler(i)
            }))
        }
    </ul>);
});

ListBox.displayName = "Listbox";

export default ListBox = Object.assign(memo(ListBox), {Option});
